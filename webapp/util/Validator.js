sap.ui.define([
    "sap/ui/core/ValueState",
    "restaurant/finalproject/util/Constants"
],
function (ValueState, Constants) {
    "use strict";

    const Validator = {

        checkAddProducts: function (oProductData, oVendorData, oView) {

            //Product data
            if (!oProductData.name) {
                oView.byId(Constants.ids.PRODUCT_NAME).setValueState(ValueState.Error);
                return;
            } else {
                oView.byId(Constants.ids.PRODUCT_NAME).setValueState(ValueState.Success);
            }
            if (!oProductData.supplier) {
                oView.byId(Constants.ids.PRODUCT_SUPPLIER).setValueState(ValueState.Error);
                return;
            } else {
                oView.byId(Constants.ids.PRODUCT_SUPPLIER).setValueState(ValueState.Success);
            }
            if (!oProductData.type){
                oView.byId(Constants.ids.PRODUCT_TYPE).setValueState(ValueState.Error);
                return;
            } else {
                oView.byId(Constants.ids.PRODUCT_TYPE).setValueState(ValueState.Success);
            }
            if (!oProductData.price_kg) {
                oView.byId(Constants.ids.PRODUCT_PRICE).setValueState(ValueState.Error);
                return;
            } else {
                oView.byId(Constants.ids.PRODUCT_PRICE).setValueState(ValueState.Success);
            }
            if (!oProductData.quantity) {
                oView.byId(Constants.ids.PRODUCT_QUANT).setValueState(ValueState.Error);
                return;
            } else {
                oView.byId(Constants.ids.PRODUCT_QUANT).setValueState(ValueState.Success);
            }
            if (!oProductData.image) {
                oView.byId(Constants.ids.PRODUCT_IMAGE).setValueState(ValueState.Error);
                return;
            } else {
                oView.byId(Constants.ids.PRODUCT_IMAGE).setValueState(ValueState.Success);
            }
            if (!oProductData.caducity) {
                oView.byId(Constants.ids.PRODUCT_CAD).setValueState(ValueState.Error);
                return;
            } else {
                oView.byId(Constants.ids.PRODUCT_CAD).setValueState(ValueState.Success);
            }

            //Vendor data
            if (!oVendorData.name) {
                oView.byId(Constants.ids.VENDOR_NAME).setValueState(ValueState.Error);
                return;
            } else {
                oView.byId(Constants.ids.VENDOR_NAME).setValueState(ValueState.Success);
            }
            if (!oVendorData.city) {
                oView.byId(Constants.ids.VENDOR_CITY).setValueState(ValueState.Error);
                return;
            } else {
                oView.byId(Constants.ids.VENDOR_CITY).setValueState(ValueState.Success);
            }
            if (!oVendorData.country) {
                oView.byId(Constants.ids.VENDOR_COUNTRY).setValueState(ValueState.Error);
                return;
            } else {
                oView.byId(Constants.ids.VENDOR_COUNTRY).setValueState(ValueState.Success);
            }
            if (!oVendorData.street) {
                oView.byId(Constants.ids.VENDOR_STREET).setValueState(ValueState.Error);
                return;
            } else {
                oView.byId(Constants.ids.VENDOR_STREET).setValueState(ValueState.Success);
            }
            if (!oVendorData.telephone) {
                oView.byId(Constants.ids.VENDOR_TELEPHONE).setValueState(ValueState.Error);
                return;
            } else {
                oView.byId(Constants.ids.VENDOR_TELEPHONE).setValueState(ValueState.Success);
            }
            if (!oVendorData.mobile) {
                oView.byId(Constants.ids.VENDOR_MOBILE).setValueState(ValueState.Error);
                return;
            } else {
                oView.byId(Constants.ids.VENDOR_MOBILE).setValueState(ValueState.Success);
            }
            if (!oVendorData.email) {
                oView.byId(Constants.ids.VENDOR_EMAIL).setValueState(ValueState.Error);
                return;
            } else {
                oView.byId(Constants.ids.VENDOR_EMAIL).setValueState(ValueState.Success);
            }
            if (!oVendorData.zipCode) {
                oView.byId(Constants.ids.VENDOR_ZIPCODE).setValueState(ValueState.Error);
                return;
            } else {
                oView.byId(Constants.ids.VENDOR_ZIPCODE).setValueState(ValueState.Success);
            }
            return true;
        }

    }

    return Validator;

}, true);