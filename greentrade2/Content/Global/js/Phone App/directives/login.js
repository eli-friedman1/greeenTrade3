myApp.directive('login', function () {
    return {
        templateUrl: '/Content/Global/js/Phone App/directives/login.html',
        controller: ['$scope', '$timeout', function MyTabsController($scope, $timeout) {
            $scope.email;
            $scope.pw;
            $scope.loginSubmit = loginSubmit;
            function loginSubmit() {
                $.ajax({
                    type: "POST",
                    url: 'http://localhost/Account/LogIn',
                    data: { email: $scope.email, pw: $scope.pw }
                })
                .then(
                    function (data) {
                        window.location.replace("http://localhost/PhoneSelection/");
                        //$timeout(function () {
                        //    // $scope.offer = data.offer;
                        //    $scope.updateOffer({ offer: data.offer });
                        //});
                    }
                );
            }
        }]
    };
});