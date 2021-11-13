sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType",
    "restaurant/finalproject/util/Formatter",
	"restaurant/finalproject/Router",
	"sap/m/MessageToast"
],
	

	function (Controller, JSONModel, Filter, FilterOperator, FilterType, Formatter, Router, MessageToast) {
		"use strict";

		return Router.extend("restaurant.finalproject.controller.Home", {

			onInit: function () {
				
			},

			onLoginTap: function (oEvent) {
				const userId = this.getView().byId("uid").getValue();
				const passwd = this.getView().byId("pasw").getValue();
				const oUsersModel = this.getOwnerComponent().getModel("users");
				const aModelData = oUsersModel.getProperty("/value");
				if (!userId || !passwd) return MessageToast.show("Rellena ambos campos del formulario");
				for (var i=0; i < aModelData.length; i++) {
					if (aModelData[i].user_id === userId && aModelData[i].password === passwd) {
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
