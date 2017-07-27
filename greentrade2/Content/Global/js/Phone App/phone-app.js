var myApp = angular.module('phoneApp', ['ngMaterial','ngRoute']);

myApp.config(function ($routeProvider, $locationProvider) {
   // $locationProvider.html5Mode(true).hashPrefix('');
    $routeProvider
    .when("/", {
        templateUrl: "/Content/Global/js/Phone App/directives/home/home.html",
        controller: "home"
    })
    .when("/phoneselection", {
        templateUrl: "/Content/Global/js/Phone App/directives/phone-selector/phone-selector.html",
        controller: "phoneSelector"
    })
    .when("/login", {
        templateUrl: "/Content/Global/js/Phone App/directives/login/login.html",
        controller: "login"
    })
    .when("/register", {
        templateUrl: "/Content/Global/js/Phone App/directives/register/register.html",
        controller: "register"
    })
    .when("/selectpickup", {
        templateUrl: "/Content/Global/js/Phone App/directives/offer/select-pickup/select-pickup.html",
        controller: "selectPickup"
    })
    .when("/confirm", {
        templateUrl: "/Content/Global/js/Phone App/directives/offer/driver-confirmation/driver-confirmation.html",
        controller: "confirm"
    })
    .when("/account", {
        templateUrl: "/Content/Global/js/Phone App/directives/account/account.html",
        controller: "account"
    })
    //.when("/paris", {
    //    templateUrl: "paris.htm",
    //    controller: "parisCtrl"
    //})
    ;
});

//myApp.component('phoneApp', {
//    templateUrl: 'app.tpl.html',
//    $routeConfig: [{
//        path: 'PhoneSelection/...',
//        name: 'phoneSelector',
//        component: 'phoneSelector'
//    }
//    , {
//        path: 'my/...',
//        name: 'Profile Settings',
//        component: 'profileSettings'
//    }
//    //, {
//    //    path: 'org/:orgId/group/:groupId/campaign/:campaignId/...',
//    //    name: 'Campaign In Group',
//    //    component: 'campaigns',
//    //}, {
//    //    path: 'org/:orgId/group/:groupId/...',
//    //    name: 'Group',
//    //    component: 'campaigns',
//    //}, {
//    //    path: 'org/:orgId/campaign/:campaignId/...',
//    //    name: 'Campaign',
//    //    component: 'campaigns',
//    //}, {
//    //    path: 'org/:orgId/...',
//    //    name: 'Org',
//    //    component: 'campaigns',
//    //    useAsDefault: true
//    //}
//    ],
//    controller: AppController,
//    controllerAs: 'vm'
//});

myApp.controller('phoneAppController', ['$scope', '$window', 'phoneService', function ($scope, $window, phoneService) {

  //  vm = this;
   // $scope.brand = 'ff';
    //vm.series;
    //vm.carrier;
    //vm.color;
    //vm.GB;
    //vm.condition;
    $scope.subTitle = 'dskjfds';
    $scope.updateTitle = updateTitle;
    function updateTitle(subTitle) {
        $scope.subTitle = subTitle;
    }

    //$scope.phoneData = {
    //    brandSelected: "",
    //    seriesSelected: "",
    //    carrierSelected: "",
    //    colorSelected: "",
    //    GBSelected: 0,
    //    conditionSelected: ""
    //};
    phoneService.setPhoneData($window.phoneDataFromSession);
    
    $scope.offer = $window.offerFromSession;
    $scope.loggedIn = $window.loggedIn;

    $scope.updateOffer = updateOffer;
    function updateOffer(offer) {
        $scope.offer = offer;
    }

}]);

myApp.directive('slideToggle', function () {
    return {
        restrict: 'A',
        scope: {
            isOpen: "=slideToggle" // 'data-slide-toggle' in our html
        },
        link: function (scope, element, attr) {
            var slideDuration = parseInt(attr.slideToggleDuration, 10) || 200;

            // Watch for when the value bound to isOpen changes
            // When it changes trigger a slideToggle
            scope.$watch('isOpen', function (newIsOpenVal, oldIsOpenVal) {
                if (newIsOpenVal !== oldIsOpenVal) {
                    element.stop().slideToggle(slideDuration);
                }
            });

        }
    };
});