sap.ui.define([
	"restaurant/finalproject/util/Formatter",
	"restaurant/finalproject/Router"
],
	

	function (Formatter, Router) {
		"use strict";

		return Router.extend("restaurant.finalproject.controller.ProductDetail", {

			oVizFrame : null,

			onInit: function () {
				this.setVizProperties();
			},

			setVizProperties: function () {
				const oVizFrame  = this.oVizFrame = this.getView().byId("idVizFrame");
            	oVizFrame.setVizProperties({
					title: {
						text: "Ventas por meses"
					},
                	plotArea: {
                    	dataLabel: {
                        	visible: true
                    	}
                	},
               	 	valueAxis: {
                    	title: {
                        	visible: true
                    	}
                	},
                	categoryAxis: {
                    	title: {
                        	visible: true
                    	}
                	}
            	});
			},

			navToProductList: function () {
				const oRouter = this.getRouter();
				oRouter.navTo("ProductList");
			},
	
        	onDataLabelChanged: function(oEvent) {
				const sState = oEvent.getParameter("state");
            	if (this.oVizFrame){
                	this.oVizFrame.setVizProperties({
                    	plotArea: {
                        	dataLabel: {
                            	visible: sState
                        	}
                    	}
                	});
            	}
        	},

        	onAxisTitleChanged: function(oEvent) {
				const sState = oEvent.getParameter("state");
            	if (this.oVizFrame){
                	this.oVizFrame.setVizProperties({
                    	valueAxis: {
                        	title: {
                            	visible: sState
                        	}
                    	},
                    	categoryAxis: {
                        	title: {
                            	visible: sState
                        	}
                    	}
                	});
            	}
        	}

        });
    }
);