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
				await this.initModels();
				await this.loadModels();
			}, 

			initModels: function () {
				this.getView().setModel(new JSONModel(), "productsTemp");
			},

            loadModels: async function () {
                await this.loadProductsModel();
            }, 

            loadProductsModel: async function () {
				const oModelProductsTemp = this.getView().getModel("productsTemp");
                const oModelProducts = this.getOwnerComponent().getModel("products");
				const oProductsData = jQuery.extend(true, {}, oModelProducts.getProperty("/value"));
				oModelProductsTemp.setProperty("/value", oProductsData);
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
				let oButton = oEvent.getSource();
				let oView = this.getView();

				if (!this._pPopover) {
					this._pPopover = Fragment.load({
						id: oView.getId(),
						name: "restaurant.finalproject.fragment.products.AddProduct",
						controller: this
					}).then(function (oPopover) {
						oView.addDependent(oPopover);
						return oPopover;
					});
				}
				this._pPopover.then(function (oPopover) {
					oPopover.openBy(oButton);
				})
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
				const sName = this.getView().byId("product_name");
				const sQuant = this.getView().byId("product_quant");
				const sBranch = this.getView().byId("product_branch");
				const sPrice = this.getView().byId("product_price");
				const sCad = this.getView().byId("product_cad");
				const sType = this.getView().byId("product_type");
				
				const oProductsModel = this.getOwnerComponent().getModel("products");				
				const oProductsTempModel = this.getView().getModel("productsTemp");

				const oNewProduct = {
					"id": "p_" + Math.floor(Math.random() * 999),
					"name": sName + "kg",
					"quantity": sQuant + "kg",
					"branch": sBranch,
					"price": sPrice + "€/kg",
					"caducity": sCad,
					"sType": sType
				};

				oProductsModel.setProperty("/value", oNewProduct);
				oProductsTempModel.setProperty("/value", oNewProduct);
				oProductsModel.refresh(true);
				oProductsTempModel.refresh(true);

			}
        });
	});
