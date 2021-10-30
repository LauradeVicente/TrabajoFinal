sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType"
],
	

	function (Controller, JSONModel, Filter, FilterOperator, FilterType) {
		"use strict";

		return Controller.extend("restaurant.finalproject.controller.App", {

			onInit: async function () {
				await this.initModels();
				await this.loadModelsData();
			},
			
			initModels: function () {
				this.getView().setModel(new JSONModel(), "coldStorages");
				this.getView().setModel(new JSONModel(), "incidents");
				this.getView().setModel(new JSONModel(), "products");
				this.getView().setModel(new JSONModel(), "vendors");
			},

			loadModelsData: async function () {
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
				const oStoragesModel = this.getView().getModel("products");
				await oStoragesModel.loadData("json/Products.json");
			},

			loadVendorsModel: async function () {
				const oStoragesModel = this.getView().getModel("vendors");
				await oStoragesModel.loadData("json/Vendors.json");
			},

			onFilterProductName: function (oEvent) {
				var aFilter = [],
				sQuery = oEvent.getParameter("query"),
				oTable = this.getView().byId("idProductsTable"),
				oBinding = oTable.getBinding("items");

				if (sQuery) aFilter.push(new Filter("name", FilterOperator.Contains, sQuery));

				oBinding.filter(aFilter);
			}

		});
	});
