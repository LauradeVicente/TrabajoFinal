sap.ui.define([
    "sap/ui/core/ValueState",
    "restaurant/finalproject/util/Constants"
],
function (ValueState, Constants) {
    "use strict";

    const Validator = {

        checkAddProducts: function (oProductData, oVendorData, oView) {

            let bError = true;
            //Product data
            if (!oProductData.name) {
                bError = false;
                oView.byId(Constants.ids.PRODUCT_NAME).setValueState(ValueState.Error);
            }
            if (!oProductData.supplier) {
                bError = false;
                oView.byId(Constants.ids.PRODUCT_SUPPLIER).setValueState(ValueState.Error);
            }
            if (!oProductData.type){
                bError = false;
                oView.byId(Constants.ids.PRODUCT_TYPE).setValueState(ValueState.Error);
            }
            if (!oProductData.price_kg) {
                bError = false;
                oView.byId(Constants.ids.PRODUCT_PRICE).setValueState(ValueState.Error);
            }
            if (!oProductData.quantity) {
                bError = false;
                oView.byId(Constants.ids.PRODUCT_QUANT).setValueState(ValueState.Error);
            }
            if (!oProductData.image) {
                bError = false;
                oView.byId(Constants.ids.PRODUCT_IMAGE).setValueState(ValueState.Error);
            }
            if (!oProductData.caducity) {
                bError = false;
                oView.byId(Constants.ids.PRODUCT_CAD).setValueState(ValueState.Error);
            }

            //Vendor data
            if (!oVendorData.name) {
                bError = false;
                oView.byId(Constants.ids.VENDOR_NAME).setValueState(ValueState.Error);
            }
            if (!oVendorData.city) {
                bError = false;
                oView.byId(Constants.ids.VENDOR_CITY).setValueState(ValueState.Error);
            }
            if (!oVendorData.street) {
                bError = false;
                oView.byId(Constants.ids.VENDOR_STREET).setValueState(ValueState.Error);
            }
            if (!oVendorData.mobile) {
                bError = false;
                oView.byId(Constants.ids.VENDOR_MOBILE).setValueState(ValueState.Error);
            }
            if (!oVendorData.email) {
                bError = false;
                oView.byId(Constants.ids.VENDOR_EMAIL).setValueState(ValueState.Error);
            }
            if (oVendorData.email) {
                let mailRegex = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
                if (!oVendorData.email.match(mailRegex)) {
                    bError = false;
                    oView.byId(Constants.ids.VENDOR_EMAIL).setValueState(ValueState.Error);
                }
            }
            return bError;
        }

    }

    return Validator;

}, true);