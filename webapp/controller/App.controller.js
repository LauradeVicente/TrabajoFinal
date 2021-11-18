sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"restaurant/finalproject/Router"
],
	

	function (JSONModel, Router) {
		"use strict";

		return Router.extend("restaurant.finalproject.controller.App", {

			onInit: async function () {
				await this.initModels();
				await this.loadModels();
				this.initRouter();
			},

			initRouter: function () {
				const Router = this.getRouter();
				if (Router._bIsInitialized) {
					Router.navTo("ProductList");
				} else {
					Router.initialize();
				}
			},
			
			initModels: function () {
				this.getOwnerComponent().setModel(new JSONModel(), "productsTemp");
				this.getOwnerComponent().setModel(new JSONModel(), "productTypes");
				this.getOwnerComponent().setModel(new JSONModel(), "users");
				this.getOwnerComponent().setModel(new JSONModel(), "products");
				this.getOwnerComponent().setModel(new JSONModel(), "vendors");
			},

			loadModels: async function () {
				await this.loadProductsModel();
				await this.loadProductsTempModel();
				await this.loadProductTypesModel();
				await this.loadUsersModel();
				await this.loadVendorsModel();
			},

			
			loadProductsModel: async function () {
				const oProductsModel = this.getOwnerComponent().getModel("products");
				await oProductsModel.loadData("json/Products.json");
			},

			loadProductsTempModel: async function () {
				const oModelProductsTemp = this.getOwnerComponent().getModel("productsTemp");
                const oModelProducts = this.getOwnerComponent().getModel("products");
				const aProductsData = jQuery.extend(true, [], oModelProducts.getProperty("/value"));
				oModelProductsTemp.setProperty("/value", aProductsData);
				
			},

			loadProductTypesModel: async function () {
				const oProductTypesModel = this.getOwnerComponent().getModel("productTypes");
				await oProductTypesModel.loadData("json/ProductTypes.json");
			},

			loadUsersModel: async function () {
				const oStoragesModel = this.getOwnerComponent().getModel("users");
				await oStoragesModel.loadData("json/Users.json");
			},

			loadVendorsModel: async function () {
				const oVendorsModel = this.getOwnerComponent().getModel("vendors");
				await oVendorsModel.loadData("json/Vendors.json");
			}

		});
	});
