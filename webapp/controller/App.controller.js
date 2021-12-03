sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"restaurant/finalproject/Router",
	"restaurant/finalproject/util/Constants"
],
	

	function (JSONModel, Router, Constants) {
		"use strict";

		return Router.extend("restaurant.finalproject.controller.App", {

			onInit: async function () {
				await this.initModels();
				await this.loadModels();
				this.initRouter();
			},

			initRouter: function () {
				const oRouter = this.getRouter();
				if (oRouter._bIsInitialized) {
					oRouter.navTo("ProductList");
				} else {
					oRouter.initialize();
				}
			},
			
			initModels: function () {
				this.getOwnerComponent().setModel(new JSONModel(), Constants.model.PRODUCTS_TEMP);
				this.getOwnerComponent().setModel(new JSONModel(), Constants.model.PRODUCTS_TYPES);
				this.getOwnerComponent().setModel(new JSONModel(), Constants.model.USERS);
				this.getOwnerComponent().setModel(new JSONModel(), Constants.model.PRODUCTS);
				this.getOwnerComponent().setModel(new JSONModel(), Constants.model.VENDORS);
				this.getOwnerComponent().setModel(new JSONModel(), Constants.model.SETTINGS);
			},

			loadModels: async function () {
				await this.loadProductsModel();
				await this.loadProductsTempModel();
				await this.loadProductTypesModel();
				await this.loadUsersModel();
				await this.loadVendorsModel();
				await this.loadSettingsModel();
			},

			
			loadProductsModel: async function () {
				const oProductsModel = this.getOwnerComponent().getModel(Constants.model.PRODUCTS);
				await oProductsModel.loadData("json/Products.json");
			},

			loadProductsTempModel: async function () {
				const oModelProductsTemp = this.getOwnerComponent().getModel(Constants.model.PRODUCTS_TEMP);
                const oModelProducts = this.getOwnerComponent().getModel(Constants.model.PRODUCTS);
				const aProductsData = jQuery.extend(true, [], oModelProducts.getProperty("/value"));
				oModelProductsTemp.setProperty("/value", aProductsData);
				
			},

			loadProductTypesModel: async function () {
				const oProductTypesModel = this.getOwnerComponent().getModel(Constants.model.PRODUCTS_TYPES);
				await oProductTypesModel.loadData("json/ProductTypes.json");
			},

			loadUsersModel: async function () {
				const oStoragesModel = this.getOwnerComponent().getModel(Constants.model.USERS);
				await oStoragesModel.loadData("json/Users.json");
			},

			loadVendorsModel: async function () {
				const oVendorsModel = this.getOwnerComponent().getModel(Constants.model.VENDORS);
				await oVendorsModel.loadData("json/Vendors.json");
			},

			loadSettingsModel: async function () {
				const oSettingsModel = this.getOwnerComponent().getModel(Constants.model.SETTINGS);
				await oSettingsModel.loadData("json/Settings.json");
			}

		});
	});
