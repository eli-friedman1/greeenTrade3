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

    var pickUpTime = {
        day: "",
        month: "",
        date: "",
        year: "",
        timeStart: "",
        timeEnd: ""
    }

    this.setPickUpTime = function (value) {
        pickUpTime = value;
    }

    this.getPickUpTime = function () {
        return pickUpTime;
    }

    var address = {
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
    }
        
    this.setAddress = function (value) {
        address = value;
    }

    this.getAddress = function () {
        return address;
    }
});