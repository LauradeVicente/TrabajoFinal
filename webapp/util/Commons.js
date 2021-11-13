sap.ui.define([
    "sap/ui/core/Fragment"
], function (Fragment) {
    "use strict";

    const Commons = {

        showMenu: function (oEvent) {
            const oButton = oEvent.getSource();

            if (!this._menu) {
                this._menu = sap.ui.xmlfragment(
                    "restaurant.finalproject.fragment.BurguerMenu",
                    this
                );
            }
            this.getView().addDependent(this._menu);
        }

    };

    return Commons;
}, true);