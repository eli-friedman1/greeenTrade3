myApp.directive('offer', function () {
    return {
        scope: {
            phoneData: '=',
            updateTitle: '&'
        },
        templateUrl: '/Content/Global/js/Phone App/directives/offer/offer.html',
        controller: ['$scope', '$timeout', function MyTabsController($scope, $timeout) {

            $scope.updateTitleInner = updateTitleInner;
            function updateTitleInner(subTitle) {
                $timeout(function () {
                    $scope.updateTitle({ subTitle: subTitle });
                });
            }
            
        }]
    };
});