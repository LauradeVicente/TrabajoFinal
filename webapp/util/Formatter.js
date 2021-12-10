sap.ui.define([
    "restaurant/finalproject/util/Constants"
],

    function (Constants) {
        "use strict";

        return {

            setDate: function (sDate) {
                let oFinalDate = new Date(sDate);
                let iDay = oFinalDate.getDate();
                let iMonth = oFinalDate.getMonth() + 1;
                let iYear = oFinalDate.getFullYear();

                iDay < 10 ? iDay = iDay.toString().padStart(2, 0) : "";
                iMonth < 10 ? iMonth = iMonth.toString().padStart(2, 0) : "";

                return iDay + "/" + iMonth + "/" + iYear;
            },

            getSearchfieldValue: function (oProduct) {
                const oSearchfieldValuesModel = appScope.getView().getModel(Constants.model.SEARCHFIELD_VALUES);
                const sColumnID = oSearchfieldValuesModel.getProperty("/column");
                return oProduct[sColumnID];
            }

        }
        
    }, true);