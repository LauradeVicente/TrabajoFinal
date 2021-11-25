sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"restaurant/finalproject/util/Formatter",
	"restaurant/finalproject/Router",
	"sap/ui/core/Fragment",
	"restaurant/finalproject/util/Constants"
],
	

	function (Controller, Formatter, Router,  Fragment, Constants) {
		"use strict";

		return Router.extend("restaurant.finalproject.controller.ProductDetail", {

			oVizFrame : null,

			onInit: function () {
				var oVizFrame  = this.oVizFrame = this.getView().byId("idVizFrame");
            	oVizFrame.setVizProperties({
                	plotArea: {
                    	dataLabel: {
                        	visible: true
                    	}
                	},
               	 	valueAxis: {
                    	title: {
                        	visible: false
                    	}
                	},
                	categoryAxis: {
                    	title: {
                        	visible: false
                    	}
                	}
            	});
			},

			/*onGenericTagPress: function (oEvent) {
				let oView = this.getView();
				let oSourceControl = oEvent.getSource();

				if (!this._pPopover) {
					Fragment.load({
						id: oView.getId(),
						name: "restaurant.finalproject.fragment.products.SalesDetail",
						controller: this
					}).then(function (oPopover) {
						this._pPopover = oPopover;
						oView.addDependent(this._pPopover);
						this._pPopover.openBy(oSourceControl);
					}.bind(this));
				} else {
					this._pPopover.openBy(oSourceControl);
				}
			},*/

			navToHome: function () {
				let Router = this.getRouter();
				Router.navTo("ProductList");
			},
	
			navToSettings: function () {
				let Router = this.getRouter();
				Router.navTo(Constants.model.SETTINGS);
			},

        	onDataLabelChanged : function(oEvent){
            	if (this.oVizFrame){
                	this.oVizFrame.setVizProperties({
                    	plotArea: {
                        	dataLabel: {
                            	visible: oEvent.getParameter("state")
                        	}
                    	}
                	});
            	}
        	},

        	onAxisTitleChanged : function(oEvent){
            	if (this.oVizFrame){
                	var state = oEvent.getParameter("state");
                	this.oVizFrame.setVizProperties({
                    	valueAxis: {
                        	title: {
                            	visible: state
                        	}
                    	},
                    	categoryAxis: {
                        	title: {
                            	visible: state
                        	}
                    	}
                	});
            	}
        	}

        });
    }
);