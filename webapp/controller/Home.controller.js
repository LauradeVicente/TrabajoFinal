sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType",
    "restaurant/finalproject/util/Formatter",
	"restaurant/finalproject/Router",
	"sap/m/MessageToast",
	"sap/m/BusyIndicator"
],
	

	function (Controller, JSONModel, Filter, FilterOperator, FilterType, Formatter, Router, MessageToast, BusyIndicator) {
		"use strict";

		return Router.extend("restaurant.finalproject.controller.Home", {

			onInit: function () {
				
			},

			onLoginTap: function (oEvent) {
				const sUserId = this.getView().byId("uid").getValue();
				const sPassw = this.getView().byId("pasw").getValue();
				const oUsersModel = this.getOwnerComponent().getModel("users");
				const aModelData = oUsersModel.getProperty("/value");
				if (!sUserId || !sPassw) return MessageToast.show("Rellena ambos campos del formulario");
				for (var i=0; i < aModelData.length; i++) {
					if (aModelData[i].user_id === sUserId && aModelData[i].password === sPassw) {
						this.navToProductList();
					} else {
						MessageToast.show("Datos incorrectos.\nInténtalo de nuevo");
					}
				}
			},

			navToProductList: function (oEvent) {
                let Router = this.getRouter();
                Router.navTo("ProductList");
            }
        });
    });
