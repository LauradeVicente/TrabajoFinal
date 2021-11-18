sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"restaurant/finalproject/Router",
	"sap/ui/core/Fragment",
	"restaurant/finalproject/util/Formatter",
	"restaurant/finalproject/util/Validator",
	"sap/ui/core/ValueState"
],
	

	function (JSONModel, Filter, FilterOperator, Router, Fragment, Formatter, Validator, ValueState) {
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
				let aProductsModelData = this.getOwnerComponent().getModel("products").getProperty(sModelPath);

				const aVendorsData = this.getOwnerComponent().getModel("vendors").getProperty("/value");
				let oVendorData = aVendorsData.filter(oVendor => oVendor.id === aProductsModelData.id);

				this.getOwnerComponent().setModel(new JSONModel(), "productDetail");
				let oDetailModel = this.getOwnerComponent().getModel("productDetail");
				this.getOwnerComponent().setModel(new JSONModel(), "productVendor");
				let oVendorModel = this.getOwnerComponent().getModel("productVendor");

				await oDetailModel.setData(aProductsModelData);
				await oVendorModel.setData(oVendorData);

				Router.navTo("ProductDetail");
			},

			addProduct: function (oEvent) {
				const oDialogData = this.getView().getModel("dialog").getProperty("/");

				if (!this.checkAddProducts(oDialogData)) return false;
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

			checkAddProducts: function (oAddProductsData) {
				if (!oAddProductsData.name) {
					this.getView().byId("product_name").setValueState(ValueState.Error);
				} else {
					this.getView().byId("product_name").setValueState(ValueState.Success);
				}
				if (!oAddProductsData.supplier) {
					this.getView().byId("product_supplier").setValueState(ValueState.Error);
				} else {
					this.getView().byId("product_supplier").setValueState(ValueState.Success);
				}
				if (!oAddProductsData.type){
					this.getView().byId("product_type").setValueState(ValueState.Error);
				} else {
					this.getView().byId("product_type").setValueState(ValueState.Success);
				}
				if (!oAddProductsData.price_kg) {
					this.getView().byId("product_price").setValueState(ValueState.Error);
				} else {
					this.getView().byId("product_price").setValueState(ValueState.Success);
				}
				if (!oAddProductsData.quantity) {
					this.getView().byId("product_quant").setValueState(ValueState.Error);
				} else {
					this.getView().byId("product_quant").setValueState(ValueState.Success);
				}
				if (!oAddProductsData.image) {
					this.getView().byId("product_image").setValueState(ValueState.Error);
				} else {
					this.getView().byId("product_image").setValueState(ValueState.Success);
				}
				if (!oAddProductsData.caducity) {
					this.getView().byId("product_cad").setValueState(ValueState.Error);
				} else {
					this.getView().byId("product_cad").setValueState(ValueState.Success);
				}
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
				const oStore = jQuery.sap.storage(jQuery.sap.storage.Type.session);
				const aProductsTempData = oEvent.getParameter("listItem").getBindingContext("productsTemp").getProperty("/value");
				for (let i = 0; i < aProductsTempData.length; i++) {
					oStore.put(aProductsTempData[i].id, aProductsTempData[i]);
				}
				

				const oSelectedProduct = oEvent.getParameter("listItem").getBindingContext("productsTemp").getObject();
				const sProductId = oEvent.getParameter("listItem").getBindingContext("productsTemp").getProperty("id");
				const bResponse = oStore.remove(sProductId);
				let aProducts = [];
				if (bResponse) {
					for (let i = 0; i < aProductsTempData.length; i++) {
						aProducts.push(oStore.get(aProductsTempData[i].id));
					}
					
				}
				const oProductsTempModel = this.getOwnerComponent().getModel("productsTemp");
				oProductsTempModel.setProperty("/value", aProducts);
				oProductsTempModel.refresh(true);

				
			}
        });
	});
