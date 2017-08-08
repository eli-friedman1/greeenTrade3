myApp.controller('phoneSelector', ['$scope', '$timeout', '$location', 'phoneService', function MyTabsController($scope, $timeout, $location, phoneService) {
    //$timeout(function () {
    //    $scope.updateTitle({ subTitle: 'START YOUR GREENTRADE' });
    //});

    
   

    //'/Content/Global/Img/sprite.svg#sprint'
    $scope.phoneBrands = {
        'iphone': {
            series: ['iPhone 7 Plus', 'iPhone 7', 'sdfdsfdsfdsdfssdf', 'dsfdsfdsdfssdfs', 'fdsfdsdfssdfss', 'sfdsfdsdfssdfsdf', 'fdsfdsdfssdfsyj', 'dsfdsfdsdfssdfsert', 'sfdsdfssdfsewe', 'sfdsdfssdfsyugyh'],
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
    $scope.selectedSeriesIndex = null;

    function selectSeries(series, index) {
        $scope.selectedSeriesIndex = index;
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
    $scope.selectedColorIndex = null;

    function selectColor(color, index) {
        $scope.selectedColorIndex = index;
        $scope.isColorSelected = true;
        $scope.phoneData.colorSelected = color;
    }

    $scope.GBs = [32, 64, 128];

    $scope.selectGB = selectGB;
    $scope.isGBSelected = false;
    $scope.selectedGBIndex = null;

    function selectGB(GB, index) {
        $scope.selectedGBIndex = index;
        $scope.isGBSelected = true;
        $scope.phoneData.GBSelected = GB;
    }

    $scope.conditions = ['Salvage', 'Broken', 'Fair', 'Very Good', 'Flawless'];

    $scope.selectCondition = selectCondition;
    $scope.isConditionSelected = false;
    $scope.selectedConditionIndex = null;

    function selectCondition(condition, index) {
        $scope.selectedConditionIndex = index;
        $scope.isConditionSelected = true;
        $scope.phoneData.conditionSelected = condition;
    }

    $scope.submit = submit;

    $scope.phoneData = phoneService.getPhoneData();
    if ($scope.phoneData != null) {
        $scope.selectedColorIndex = $scope.colors.indexOf($scope.phoneData.colorSelected);
    }

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