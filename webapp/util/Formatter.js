sap.ui.define([
    "restaurant/finalproject/util/Constants",
    "restaurant/finalproject/util/Formatter"
],

    function (Constants, Formatter) {
        "use strict";

        return {

            setDate: function (sDate) {
                if (!sDate) return;
                if (sDate.length === 8) {
                    let aDate = sDate.split("/");
                    let sDay = aDate[0];
                    let sMonth = aDate[1];
                    let sYear = "20" + aDate[2];
                    return sDay + "/" + sMonth + "/" + sYear;
                }
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
                if (sColumnID === "caducity") return restaurant.finalproject.util.Formatter.setDate(oProduct[sColumnID]);
                return oProduct[sColumnID];
            }

        }
        
    }, true);