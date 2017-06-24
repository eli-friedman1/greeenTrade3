myApp.directive('driverConfirmation', function () {
    return {
        scope: {
            updateTitleInner: '&'
        },
        templateUrl: '/Content/Global/js/Phone App/directives/offer/driver-confirmation/driver-confirmation.html',
        controller: ['$scope', '$timeout', function MyTabsController($scope, $timeout) {
            $timeout(function () {
                $scope.updateTitleInner({ subTitle: 'DRIVER CONFIRMATION' });
            });

        }]
    };
});