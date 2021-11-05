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

		return Controller.extend("restaurant.finalproject.controller.ProductList", {

			onInit: async function () {
				await this.loadModels();
			}, 

            loadModels: function () {
                this.loadProductsModel();
            }, 

            loadProductsModel: function () {
                this.getOwnerComponent().getModel("products");
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
