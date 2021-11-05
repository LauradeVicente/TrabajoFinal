sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
],

function (Controller, History)  {
    "use strict";

    return Controller.extend("restaurant.finalproject.view.Router", {

        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        }, 

        navTo: function (...args) {
            this.getRouter().navTo(...args);
        }

    })
})