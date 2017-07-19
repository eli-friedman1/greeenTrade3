myApp.directive('offer', function () {
    return {
        //scope: {
        //    phoneData: '='
        //},
        templateUrl: '/Content/Global/js/Phone App/directives/offer/offer.html',
        controller: ['$scope', '$timeout', 'phoneService', function MyTabsController($scope, $timeout, phoneService) {
            $scope.phoneData = phoneService.getPhoneData();
            //$scope.updateTitleInner = updateTitleInner;
            //function updateTitleInner(subTitle) {
            //    $timeout(function () {
            //        $scope.updateTitle({ subTitle: subTitle });
            //    });
            //}
            
        }]
    };
});