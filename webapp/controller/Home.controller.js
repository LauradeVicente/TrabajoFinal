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

		return Router.extend("restaurant.finalproject.controller.Home", {

			onInit: function () {
				
			},

            navToProductList: function (oEvent) {
                let Router = this.getRouter();
                Router.navTo("ProductList");
            }
        });
    });
