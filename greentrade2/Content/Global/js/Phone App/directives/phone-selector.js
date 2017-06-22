myApp.directive('phoneSelector', function () {
    return {
        scope:{
            phoneData: '=',
            updateOffer: '&'
        },
        controller: ['$scope', '$timeout', function MyTabsController($scope, $timeout) {
            $scope.phoneBrands = {
                'iphone': ['series1', 'series2'],
                'android': ['series1', 'series2'],
                'samsung': ['series1', 'series2'],
                'htc': ['series1', 'series2'],
                'other': ['series1', 'series2']
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

            $scope.carriers = ['sprint', 'att'];

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
                    url: 'http://localhost/PhoneSelection/SubmitPhoneForm',
                    data: { brand: $scope.phoneData.brandSelected, series: $scope.phoneData.seriesSelected, carrier: $scope.phoneData.carrierSelected, color: $scope.phoneData.colorSelected, GB: $scope.phoneData.GBSelected, condition: $scope.phoneData.conditionSelected }
                })
                .then(
                    function (data) {
                        $timeout(function () {
                           // $scope.offer = data.offer;
                            $scope.updateOffer({ offer: data.offer });
                        });
                    }
                );
            }
        }],
        templateUrl: '/Content/Global/js/Phone App/directives/phone-selector.html'
    };
});