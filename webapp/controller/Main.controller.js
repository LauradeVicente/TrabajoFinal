sap.ui.define([
	"restaurant/finalproject/Router"
],
	

	function (Router) {
		"use strict";

		return Router.extend("restaurant.finalproject.controller.App", {

			onInit: function () {
				
			},

            navToProductList: function () {
                let oRouter = this.getRouter();
                oRouter.navTo("ProductList");
            }

		});
	});