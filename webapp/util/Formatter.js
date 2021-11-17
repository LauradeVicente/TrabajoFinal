sap.ui.define([],

    function () {
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
            }

        }
        
    }, true);