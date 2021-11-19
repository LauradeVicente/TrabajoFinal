sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"restaurant/finalproject/util/Formatter",
	"sap/ui/core/Fragment"
],
	

	function (Controller, Formatter,  Fragment) {
		"use strict";

		return Controller.extend("restaurant.finalproject.controller.ProductDetail", {

			onInit: function () {
				this.getOwnerComponent().get
			},

			onGenericTagPress: function (oEvent) {
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
			}
	

        });
    }
);