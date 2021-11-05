sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType",
	"restaurant/finalproject/util/Formatter",
	"restaurant/finalproject/Router"
],
	

	function (Controller, JSONModel, Filter, FilterOperator, FilterType, Formatter, Router) {
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
					Router.navTo("Home");
				} else {
					Router.initialize();
				}
			},
			
			initModels: function () {
				this.getView().setModel(new JSONModel(), "coldStorages");
				this.getView().setModel(new JSONModel(), "incidents");
				this.getOwnerComponent().setModel(new JSONModel(), "products");
				this.getView().setModel(new JSONModel(), "vendors");
			},

			loadModels: async function () {
				await this.loadStoragesModel();
				await this.loadIncidentsModel();
				await this.loadProductsModel();
				await this.loadVendorsModel();
			},

			loadStoragesModel: async function () {
				const oStoragesModel = this.getView().getModel("coldStorages");
				await oStoragesModel.loadData("json/ColdStorages.json");
			},

			loadIncidentsModel: async function () {
				const oIncidentsModel = this.getView().getModel("incidents");
				await oIncidentsModel.loadData("json/Incidents.json");
			},

			loadProductsModel: async function () {
				const oStoragesModel = this.getOwnerComponent().getModel("products");
				await oStoragesModel.loadData("json/Products.json");
			},

			loadVendorsModel: async function () {
				const oStoragesModel = this.getView().getModel("vendors");
				await oStoragesModel.loadData("json/Vendors.json");
			}

		});
	});
