myApp.service('phoneService', function () {
    var phoneData = {
        brandSelected: "",
        seriesSelected: "",
        carrierSelected: "",
        colorSelected: "",
        GBSelected: 0,
        conditionSelected: "",
        offer: 0
    };
    //var phoneData = {
    //    brandSelected,
    //    seriesSelected,
    //    carrierSelected,
    //    colorSelected,
    //    GBSelected,
    //    conditionSelected
    //};

    this.setPhoneData = function (value) {
        phoneData = value;
    }

    this.getPhoneData = function () {
        return phoneData;
    }
        
});