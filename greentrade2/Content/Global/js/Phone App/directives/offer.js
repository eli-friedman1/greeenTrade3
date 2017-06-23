myApp.directive('offer', function () {
    return {
        scope: {
            phoneData: '='
        },
        templateUrl: '/Content/Global/js/Phone App/directives/offer.html',
        controller: ['$scope', '$timeout', function MyTabsController($scope, $timeout) {
            
        }]
    };
});