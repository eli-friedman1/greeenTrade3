myApp.controller('register', ['$scope', '$timeout', '$route', 'phoneService', function MyTabsController($scope, $timeout, $route, phoneService) {
    $scope.email;
    $scope.pw;
    $scope.fName;
    $scope.lName;
    $scope.registerSubmit = registerSubmit;
    function registerSubmit() {
        $.ajax({
            type: "POST",
            url: '/Account/RegisterAjax',
            data: { email: $scope.email, pw: $scope.pw, fName: $scope.fName, lName: $scope.lName, address: $scope.address, city: $scope.city, state: $scope.state, zip: $scope.zip, phone: $scope.phone }
        })
        .then(
            function (data) {
                window.location = ("/PhoneSelection#!/selectPickup");
                $timeout(function () {
                    window.location.reload();
                }, 500);
                

            }
        );
    }
}]);