myApp.controller('account', ['$scope', '$timeout', 'phoneService', function MyTabsController($scope, $timeout, phoneService) {
    $scope.tradeClicked = tradeClicked;
    function tradeClicked(index) {
        $scope.clicked[index] = !$scope.clicked[index];
    }
    getMyTrades();
    function getMyTrades() {
        $.ajax({
            type: "POST",
            url: '/Account/GetMyTrades'
        })
        .then(
            function (data) {
                $timeout(function () {
                    $scope.trades = data.trades;
                });
                $scope.clicked = new Array(data.trades.length);
            }
        );
    }
}]);