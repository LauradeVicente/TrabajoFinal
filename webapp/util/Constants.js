sap.ui.define("restaurant.finalproject.util.Constants", [], function () {
	'use strict';
	
	return {

		//Models
		model: {
            PRODUCTS: "products",
            PRODUCTS_TEMP: "productsTemp",
            PRODUCTS_TYPES: "productTypes",
            VENDORS: "vendors",
            SETTINGS: "settings",
            USERS: "users",
            PRODUCT_DIALOG: "dialog",
            VENDOR_DIALOG: "vendorDialog",
            SEARCHFIELD_VALUES: "searchfieldValuesModel"
        },

        //IDs
        ids: {
            //Products data
            PRODUCT_NAME: "product_name",
            PRODUCT_SUPPLIER: "product_supplier",
            PRODUCT_TYPE: "product_type",
            PRODUCT_PRICE: "product_price",
            PRODUCT_QUANT: "product_quant",
            PRODUCT_IMAGE: "product_image",
            PRODUCT_CAD: "product_cad",
            PRODUCTS_FILTER_POPOVER: "products_filter_popover",

            //Vendors data
            VENDOR_NAME: "vendor_name",
            VENDOR_CITY: "vendor_city",
            VENDOR_COUNTRY: "vendor_country",
            VENDOR_STREET: "vendor_street",
            VENDOR_TELEPHONE: "vendor_telephone",
            VENDOR_MOBILE: "vendor_mobile",
            VENDOR_EMAIL: "vendor_email",
            VENDOR_ZIPCODE: "vendor_zipCode"
        }
    }
    
}, true);