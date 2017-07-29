var myApp = angular.module("phoneApp", ['ngMaterial']);
myApp.controller('HomePageController', function($scope) {
  $scope.box1=true;
});
    
myApp.directive('slideToggle', function() {  
  return {
    restrict: 'A',      
    scope:{
      isOpen: "=slideToggle" // 'data-slide-toggle' in our html
    },  
    link: function(scope, element, attr) {
      var slideDuration = parseInt(attr.slideToggleDuration, 10) || 200;      
      
      // Watch for when the value bound to isOpen changes
      // When it changes trigger a slideToggle
      scope.$watch('isOpen', function(newIsOpenVal, oldIsOpenVal){
        if(newIsOpenVal !== oldIsOpenVal){ 
          element.stop().slideToggle(slideDuration);
        }
      });
      
    }
  };  
});
