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

		return Controller.extend("restaurant.finalproject.controller.ProductDetail", {

			onInit: async function () {
				await this.loadModels();
			},

            loadModels: function () {
                this.loadProductDetailModel();
            },

            loadProductDetailModel: function () {
                this.getOwnerComponent().getModel("productDetail");
            }

        });
    }
);