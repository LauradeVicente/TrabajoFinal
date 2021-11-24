sap.ui.define([
    "sap/ui/core/ValueState",
],
function (ValueState) {
    "use strict";

    const Validator = {

        checkAddProducts: function (oAddProductsData, oView) {
            if (!oAddProductsData.name) {
                oView.byId("product_name").setValueState(ValueState.Error);
                return;
            } else {
                oView.byId("product_name").setValueState(ValueState.Success);
            }
            if (!oAddProductsData.supplier) {
                oView.byId("product_supplier").setValueState(ValueState.Error);
                return;
            } else {
                oView.byId("product_supplier").setValueState(ValueState.Success);
            }
            if (!oAddProductsData.type){
                oView.byId("product_type").setValueState(ValueState.Error);
                return;
            } else {
                oView.byId("product_type").setValueState(ValueState.Success);
            }
            if (!oAddProductsData.price_kg) {
                oView.byId("product_price").setValueState(ValueState.Error);
                return;
            } else {
                oView.byId("product_price").setValueState(ValueState.Success);
            }
            if (!oAddProductsData.quantity) {
                oView.byId("product_quant").setValueState(ValueState.Error);
                return;
            } else {
                oView.byId("product_quant").setValueState(ValueState.Success);
            }
            if (!oAddProductsData.image) {
                oView.byId("product_image").setValueState(ValueState.Error);
                return;
            } else {
                oView.byId("product_image").setValueState(ValueState.Success);
            }
            if (!oAddProductsData.caducity) {
                oView.byId("product_cad").setValueState(ValueState.Error);
                return;
            } else {
                oView.byId("product_cad").setValueState(ValueState.Success);
            }
            return true;
        }

    }

    return Validator;

}, true);