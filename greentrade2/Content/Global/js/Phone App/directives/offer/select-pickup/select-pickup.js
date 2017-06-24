myApp.directive('selectPickup', function () {
    return {
        scope: {
            updateTitleInner: '&'
        },
        templateUrl: '/Content/Global/js/Phone App/directives/offer/select-pickup/select-pickup.html',
        controller: ['$scope', '$timeout', function MyTabsController($scope, $timeout) {
            $timeout(function () {
                $scope.updateTitleInner({ subTitle: 'PLEASE SELECT A PICK UP TIME' });
            });

            $scope.days = [{
                dayOfWeek: 'Sunday',
                openTimeSlots: ['6:00-7:00 PM', '7:00-8:00 PM', '8:00-9:00 PM', '9:00-10:00 PM']
            }, {
                dayOfWeek: 'Monday',
                openTimeSlots: ['6:00-7:00 PM', '7:00-8:00 PM', '8:00-9:00 PM', '9:00-10:00 PM']
            }, {
                dayOfWeek: 'Tuesday',
                openTimeSlots: ['6:00-7:00 PM', '7:00-8:00 PM', '8:00-9:00 PM', '9:00-10:00 PM']
            }, {
                dayOfWeek: 'Wednesday',
                openTimeSlots: ['6:00-7:00 PM', '7:00-8:00 PM', '8:00-9:00 PM', '9:00-10:00 PM']
            }];

            $scope.itemClicked = itemClicked;
            function itemClicked(dateTime, parentIndex, childIndex) {
                $scope.selectedSlot = //dateTime
                $scope.selectedParentIndex = parentIndex;
                $scope.selectedChildIndex = childIndex;
            }

            $scope.submitPickUpTime = submitPickUpTime;
            function submitPickUpTime() {

            }
        }]
    };
});