myApp.controller('register', ['$scope', '$timeout', '$route', 'phoneService', function MyTabsController($scope, $timeout, $route, phoneService) {
    $scope.email;
    $scope.pw;
    $scope.fName;
    $scope.lName;
    $scope.registerSubmit = registerSubmit;
    $scope.phoneData = phoneService.getPhoneData();
    function registerSubmit() {
        $.ajax({
            type: "POST",
            url: '/Account/RegisterAjax',
            data: { email: $scope.email, pw: $scope.pw, fName: $scope.fName, lName: $scope.lName, address: $scope.address, city: $scope.city, state: $scope.state, zip: $scope.zip, phone: $scope.phone }
        })
        .then(
            function (data) {
                phoneService.loggedIn.value = true;
                phoneService.firstName = data.firstName;
                if ($scope.phoneData.offer == null) {
                    window.location = ("/#!/phoneselection");
                    //  window.location.reload();
                } else {
                    window.location = ("/#!/selectpickup");
                    //  window.location.reload();
                }
                //window.location = ("/#!/selectpickup");
                //$timeout(function () {
                //    window.location.reload();
                //}, 500);
                

            }
        );
    }
}]);