myApp.controller('phoneSelector', ['$scope', '$timeout', '$location', 'phoneService', function MyTabsController($scope, $timeout, $location, phoneService) {
    //$timeout(function () {
    //    $scope.updateTitle({ subTitle: 'START YOUR GREENTRADE' });
    //});

    $scope.phoneData = phoneService.getPhoneData();


    //'/Content/Global/Img/sprite.svg#sprint'
    $scope.phoneBrands = {
        'iphone': {
            series: ['series1', 'series2', 'sdfdsfdsfdsdfssdf', 'dsfdsfdsdfssdfs', 'fdsfdsdfssdfss', 'sfdsfdsdfssdfsdf', 'fdsfdsdfssdfsyj', 'dsfdsfdsdfssdfsert', 'sfdsdfssdfsewe', 'sfdsdfssdfsyugyh'],
            imageUrl: "/Content/Global/Img/iphine-icon.png"
        },
        'android': {
            series: ['series1', 'series2'],
            imageUrl: "/Content/Global/Img/android.png"
        },
        'samsung': {
            series: ['series1', 'series2'],
            imageUrl: "/Content/Global/Img/samsung.png"
        },
        'htc': {
            series: ['series1', 'series2'],
            imageUrl: "/Content/Global/Img/htc.png"
        },
        'other': {
            series: ['series1', 'series2'],
            imageUrl: null
        }
    };

    $scope.selectBrand = selectBrand;
    $scope.isBrandSelected = false;

    function selectBrand(brand) {
        $scope.isBrandSelected = true;
        $scope.phoneData.brandSelected = brand;
        // $scope.phoneData.brand = brand;
    }

    $scope.selectSeries = selectSeries;
    $scope.isSeriesSelected = false;

    function selectSeries(series) {
        $scope.isSeriesSelected = true;
        $scope.phoneData.seriesSelected = series;
    }

    $scope.carriers = [
        ['att', '/Content/Global/Img/at.png'],
        ['sprint', '/Content/Global/Img/sprint.png'],
        ['t-mobile', '/Content/Global/Img/t-mobile.png'],
        ['verizon', '/Content/Global/Img/verizon.png'],
        ['unlocked', '/Content/Global/Img/unlock.png']
    ];

    $scope.selectCarrier = selectCarrier;
    $scope.isCarrierSelected = false;

    function selectCarrier(carrier) {
        $scope.isCarrierSelected = true;
        $scope.phoneData.carrierSelected = carrier;
    }

    $scope.colors = ['black', 'white'];

    $scope.selectColor = selectColor;
    $scope.isColorSelected = false;

    function selectColor(color) {
        $scope.isColorSelected = true;
        $scope.phoneData.colorSelected = color;
    }

    $scope.GBs = [32, 64, 128];

    $scope.selectGB = selectGB;
    $scope.isGBSelected = false;

    function selectGB(GB) {
        $scope.isGBSelected = true;
        $scope.phoneData.GBSelected = GB;
    }

    $scope.conditions = ['Salvage', 'Broken', 'Fair', 'Very Good', 'Flawless'];

    $scope.selectCondition = selectCondition;
    $scope.isConditionSelected = false;

    function selectCondition(condition) {
        $scope.isConditionSelected = true;
        $scope.phoneData.conditionSelected = condition;
    }

    $scope.submit = submit;

    function submit() {
        $.ajax({
            type: "POST",
            url: '/PhoneSelection/SubmitPhoneForm',
            data: { brand: $scope.phoneData.brandSelected, series: $scope.phoneData.seriesSelected, carrier: $scope.phoneData.carrierSelected, color: $scope.phoneData.colorSelected, GB: $scope.phoneData.GBSelected, condition: $scope.phoneData.conditionSelected }
        })
        .then(
            function (data) {
                $scope.phoneData.offer = data.offer;
                phoneService.setPhoneData($scope.phoneData);
                //$timeout(function () {
                //     $scope.offer = data.offer;
                //    // $scope.updateOffer({ offer: data.offer });
                //});

                if (!data.loggedIn) {
                    window.location = "/#!/login";
                } else {
                    window.location = "/#!/selectpickup";
                }
            }
        );
    }
}]);