sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"restaurant/finalproject/Router",
	"sap/ui/core/Fragment",
	"restaurant/finalproject/util/Formatter",
	"restaurant/finalproject/util/Validator",
	"sap/ui/core/ValueState",
	"restaurant/finalproject/util/Constants"
],
	

	function (JSONModel, Filter, FilterOperator, Router, Fragment, Formatter, Validator, ValueState, Constants) {
		"use strict";

		return Router.extend("restaurant.finalproject.controller.ProductList", {

			onInit: async function () {
				this.getView().setModel(new JSONModel(), Constants.model.PRODUCT_DIALOG);
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
				const oModel = this.getOwnerComponent().getModel(Constants.model.PRODUCTS);
				const aOriginalModelData = oModel.getProperty("/value");
				let aTempModelData = jQuery.extend(true, [], aOriginalModelData);

				if (!aSelectedItems.length) {
					this.getView().getModel(Constants.model.PRODUCTS_TEMP).setProperty("/value", aTempModelData);
					return;
				}
				aTempModelData = aTempModelData.filter(data => 
					aSelectedItems.find(oItem =>
						oItem.getText() === data.type
					)
				);
				this.getView().getModel(Constants.model.PRODUCTS_TEMP).setProperty("/value", aTempModelData);
			},

			handlePopoverAddProducts: function () {
				let oView = this.getView();
				const oDialogModel = this.getView().getModel(Constants.model.PRODUCT_DIALOG);
				const oVendorDialogModel = this.getView().getModel(Constants.model.VENDOR_DIALOG);

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
					oVendorDialogModel.setData({});
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
				let oProductData = this.getOwnerComponent().getModel(Constants.model.PRODUCTS).getProperty(sModelPath);

				const aVendorsData = this.getOwnerComponent().getModel(Constants.model.VENDORS).getProperty("/value");
				let aVendorData = aVendorsData.filter(oVendor => oVendor.product === oProductData.name);

				this.getOwnerComponent().setModel(new JSONModel(), "productDetail");
				let oDetailModel = this.getOwnerComponent().getModel("productDetail");
				this.getOwnerComponent().setModel(new JSONModel(), "productVendor");
				let oVendorModel = this.getOwnerComponent().getModel("productVendor");

				await oDetailModel.setData(oProductData);
				await oVendorModel.setData(aVendorData[0]);

				Router.navTo("ProductDetail");
			},

			addProduct: function () {
				const oDialogData = this.getView().getModel(Constants.model.PRODUCT_DIALOG).getProperty("/");
				const oVendorDialogData = this.getView().getModel(Constants.model.VENDOR_DIALOG).getProperty("/");
			

				if (!Validator.checkAddProducts(oDialogData, this.getView())) return;
				const oProductsModel = this.getOwnerComponent().getModel(Constants.model.PRODUCTS);				
				const oProductsTempModel = this.getView().getModel(Constants.model.PRODUCTS_TEMP);
				const aProductsTempData = oProductsTempModel.getProperty("/value");
				const oVendorsModel = this.getOwnerComponent().getModel(Constants.model.VENDORS);
				const aVendorsData = oVendorsModel.getProperty("/value");

				aProductsTempData.push(oDialogData);
				aVendorsData.push(oVendorDialogData);

				oProductsModel.setProperty("/value", aProductsTempData);
				oProductsTempModel.setProperty("/value", aProductsTempData);
				oVendorsModel.setProperty("/value", aVendorsData);
				oProductsModel.refresh(true);
				oProductsTempModel.refresh(true);
				oVendorsModel.refresh(true);
				this.closeAddProductsDialog();
			},

			onSuggest: function (oEvent) {
				let sTerm = oEvent.getParameter("suggestValue");
				var aFilters = [];
				if (sTerm) {
					aFilters.push(new Filter("type", FilterOperator.StartsWith, sTerm));
				}

				oEvent.getSource().getBinding("suggestionItems").filter(aFilters);
			},
			
			onDeleteProduct: function (oEvent) {
				const oProductsModel = this.getOwnerComponent().getModel(Constants.model.PRODUCTS_TEMP);
				let sProductPath = oEvent.getParameter("listItem").getBindingContext(Constants.model.PRODUCTS_TEMP).getPath();
				oProductsModel.setProperty(sProductPath, undefined);
				const aProducts = oProductsModel.getProperty("/value");
				const iProductPath = aProducts.indexOf(undefined);
				if (iProductPath > -1) {
					aProducts.splice(iProductPath, 1);
				}
				oProductsModel.refresh(true);
			},

			openProductsFilters: function (oEvent) {
				const oIcon = oEvent.getSource();
				const sIconId = oIcon.getId();
				let sField;
			}
        });
	});
