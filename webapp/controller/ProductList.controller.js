sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType",
    "restaurant/finalproject/util/Formatter",
	"restaurant/finalproject/Router",
	"restaurant/finalproject/util/Commons",
	"sap/ui/core/Fragment"
],
	

	function (Controller, JSONModel, Filter, FilterOperator, FilterType, Formatter, Router, Commons, Fragment) {
		"use strict";

		return Router.extend("restaurant.finalproject.controller.ProductList", {

			onInit: async function () {
				this.getView().setModel(new JSONModel(), "dialog");

			},

			onFilterProductName: function (oEvent) {
				var aFilter = [],
				sQuery = oEvent.getParameter("query"),
				oTable = this.getView().byId("idProductsTable"),
				oBinding = oTable.getBinding("items");

				if (sQuery) aFilter.push(new Filter("name", FilterOperator.Contains, sQuery));

				oBinding.filter(aFilter);
			},

			onFilterProductType: function(oEvent) {
				const aSelectedItems = oEvent.getSource().getSelectedItems();
				const oModel = this.getOwnerComponent().getModel("products");
				const aOriginalModelData = oModel.getProperty("/value");
				let aTempModelData = jQuery.extend(true, [], aOriginalModelData);

				if (!aSelectedItems.length) {
					this.getView().getModel("productsTemp").setProperty("/value", aTempModelData);
					return;
				}
				aTempModelData = aTempModelData.filter(data => 
					aSelectedItems.find(oItem =>
						oItem.getText() === data.type
					)
				);
				this.getView().getModel("productsTemp").setProperty("/value", aTempModelData);
			},

			handlePopoverAddProducts: function (oEvent) {
				let oView = this.getView();
				const oDialogModel = this.getView().getModel("dialog");

				if (!this._oDialog) {
					Fragment.load({
						id: oView.getId(),
						name: "restaurant.finalproject.fragment.products.AddProduct",
						controller: this
					}).then(function (oDialog) {
						this._oDialog = oDialog;
						oView.addDependent(this._oDialog);
						oDialogModel.setData({});
						this._oDialog.open();
					}.bind(this));
				} else {
					oDialogModel.setData({});
					this._oDialog.open();
				}
				
			},

			closeAddProductsDialog: function () {
				if (!this._oDialog) return;
				this._oDialog.close();
				this._oDialog.destroy();
				this._oDialog = null;
			},

			navToDetail: async function (oEvent) {
				let Router = this.getRouter();
				let sModelPath = oEvent.getSource().getBindingContextPath();
				let oModelData = this.getOwnerComponent().getModel("products").getProperty(sModelPath);

				this.getOwnerComponent().setModel(new JSONModel(), "productDetail");
				let oModel = this.getOwnerComponent().getModel("productDetail");
				await oModel.setData(oModelData);

				Router.navTo("ProductDetail");
			},

			addProduct: function (oEvent) {
				
				const oDialogData = this.getView().getModel("dialog").getProperty("/");
				const oProductsModel = this.getOwnerComponent().getModel("products");				
				const oProductsTempModel = this.getView().getModel("productsTemp");
				const aProductsTempData = oProductsTempModel.getProperty("/value");

				aProductsTempData.push(oDialogData);

				oProductsModel.setProperty("/value", aProductsTempData);
				oProductsTempModel.setProperty("/value", aProductsTempData);
				oProductsModel.refresh(true);
				oProductsTempModel.refresh(true);
				this.closeAddProductsDialog();

			},

			onSuggest: function (oEvent) {
				let sTerm = oEvent.getParameter("suggestValue");
				var aFilters = [];
				if (sTerm) {
					aFilters.push(new Filter("type", FilterOperator.StartsWith, sTerm));
				}

				oEvent.getSource().getBinding("suggestionItems").filter(aFilters);
			} 
        });
	});
