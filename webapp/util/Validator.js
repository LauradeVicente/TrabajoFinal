sap.ui.define([
    "sap/ui/core/ValueState",
],
function (ValueState) {
    "use strict";

    const Validator = {

        checkAddProducts: function (oAddProductsData) {
            if (!oAddProductsData.name) {
                this.byId("product_name").setValueState(ValueState.Error);
            }
            if (!oAddProductsData.supplier) {
                this.byId("product_supplier").setValueState(ValueState.Error);
            }
            if (!oAddProductsData.type){
                this.byId("product_type").setValueState(ValueState.Error);
            }
            if (!oAddProductsData.price_kg) {
                this.byId("product_price").setValueState(ValueState.Error);
            }
            if (!oAddProductsData.quantity) {
                this.byId("product_quant").setValueState(ValueState.Error);
            }
            if (!oAddProductsData.image) {
                this.byId("product_image").setValueState(ValueState.Error);
            }
            if (!oAddProductsData.caducity) {
                this.byId("product_cad").setValueState(ValueState.Error);
            }
        }

    }

    return Validator;

}, true);