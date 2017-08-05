myApp.service('phoneService', function () {
    
    this.loggedIn = { value: false };
    this.firstName = null;

    var phoneData;
    //var phoneData = {
    //    brandSelected: null,
    //    seriesSelected: null,
    //    carrierSelected: null,
    //    colorSelected: null,
    //    GBSelected: null,
    //    conditionSelected: null,
    //    offer: null
    //};
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

    var pickUpTime;
    //var pickUpTime = {
    //    day: "",
    //    month: "",
    //    date: "",
    //    year: "",
    //    timeStart: "",
    //    timeEnd: ""
    //}

    this.setPickUpTime = function (value) {
        pickUpTime = value;
    }

    this.getPickUpTime = function () {
        return pickUpTime;
    }

    var address;
    //var address = {
    //    address1: "",
    //    address2: "",
    //    city: "",
    //    state: "",
    //    zip: "",
    //}
        
    this.setAddress = function (value) {
        address = value;
    }

    this.getAddress = function () {
        return address;
    }

});