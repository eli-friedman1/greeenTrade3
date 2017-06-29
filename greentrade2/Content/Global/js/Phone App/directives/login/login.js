//myApp.directive('login', function () {
//    return {
//        templateUrl: '/Content/Global/js/Phone App/directives/login/login.html',
//        controller: ['$scope', '$timeout', function MyTabsController($scope, $timeout) {
//            $scope.email;
//            $scope.pw;
//            $scope.loginSubmit = loginSubmit;
//            function loginSubmit() {
//                $.ajax({
//                    type: "POST",
//                    url: 'http://localhost/Account/LogInAjax',
//                    data: { email: $scope.email, pw: $scope.pw }
//                })
//                .then(
//                    function (data) {
//                        window.location.replace("http://localhost/PhoneSelection/");
//                        //$timeout(function () {
//                        //    // $scope.offer = data.offer;
//                        //    $scope.updateOffer({ offer: data.offer });
//                        //});
//                    }
//                );
//            }
//        }]
//    };
//});

myApp.controller('login', ['$scope', '$timeout', 'phoneService', function MyTabsController($scope, $timeout, phoneService) {
    $scope.email;
    $scope.pw;
    $scope.loginSubmit = loginSubmit;
    function loginSubmit() {
        $.ajax({
            type: "POST",
            url: 'http://localhost/Account/LogInAjax',
            data: { email: $scope.email, pw: $scope.pw }
        })
        .then(
            function (data) {
                window.location = ("http://localhost/PhoneSelection#!/selectPickup");
                window.location.reload();
                //$timeout(function () {
                //    // $scope.offer = data.offer;
                //    $scope.updateOffer({ offer: data.offer });
                //});
            }
        );
    }
    $scope.register = register;
    function register() {
        window.location = ("http://localhost/PhoneSelection#!/register");
    }
}]);