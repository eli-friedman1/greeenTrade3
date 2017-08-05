//myApp.directive('selectPickup', function () {
//    return {
//        scope: {
//            updateTitleInner: '&'
//        },
//        templateUrl: '/Content/Global/js/Phone App/directives/offer/select-pickup/select-pickup.html',
//        controller: ['$scope', '$timeout', function MyTabsController($scope, $timeout) {
//            $timeout(function () {
//                $scope.updateTitleInner({ subTitle: 'PLEASE SELECT A PICK UP TIME' });
//            });

//            $scope.days = [{
//                dayOfWeek: 'Sunday',
//                openTimeSlots: ['6:00-7:00 PM', '7:00-8:00 PM', '8:00-9:00 PM', '9:00-10:00 PM']
//            }, {
//                dayOfWeek: 'Monday',
//                openTimeSlots: ['6:00-7:00 PM', '7:00-8:00 PM', '8:00-9:00 PM', '9:00-10:00 PM']
//            }, {
//                dayOfWeek: 'Tuesday',
//                openTimeSlots: ['6:00-7:00 PM', '7:00-8:00 PM', '8:00-9:00 PM', '9:00-10:00 PM']
//            }, {
//                dayOfWeek: 'Wednesday',
//                openTimeSlots: ['6:00-7:00 PM', '7:00-8:00 PM', '8:00-9:00 PM', '9:00-10:00 PM']
//            }];

//            $scope.itemClicked = itemClicked;
//            function itemClicked(dateTime, parentIndex, childIndex) {
//                $scope.selectedSlot = //dateTime
//                $scope.selectedParentIndex = parentIndex;
//                $scope.selectedChildIndex = childIndex;
//            }

//            $scope.submitPickUpTime = submitPickUpTime;
//            function submitPickUpTime() {

//            }
//        }]
//    };
//});

myApp.controller('selectPickup', ['$scope', '$timeout', 'phoneService', '$window', function MyTabsController($scope, $timeout, phoneService, $window) {
    $timeout(function () {
        //  $scope.updateTitleInner({ subTitle: 'PLEASE SELECT A PICK UP TIME' });
    });

    $scope.phoneData = phoneService.getPhoneData();
    if ($scope.phoneData.offer == null) {
        window.location = ("/#!/phoneselection");
    } else if (!phoneService.loggedIn.value) {
        window.location = ("/#!/phoneselection");
    }
    
    $scope.firstName = phoneService.firstName;

    var today = new Date();
    var hours = ['6:00-7:00 PM', '7:00-8:00 PM', '8:00-9:00 PM', '9:00-10:00 PM'];

    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    offset = 0;

    $scope.days = [];
    for (var i = 0; i < 4; i++) {
        $scope.days.push({
            dayOfWeek: days[(today.getDay() + offset + i) % 7],
            openTimeSlots: hours
        });
    }

    //$scope.days = [{
    //    dayOfWeek: days[(today.getDay() + offset) % 7],
    //    openTimeSlots: hours
    //}, {
    //    dayOfWeek: 'Monday',
    //    openTimeSlots: hours
    //}, {
    //    dayOfWeek: 'Tuesday',
    //    openTimeSlots: hours
    //}, {
    //    dayOfWeek: 'Wednesday',
    //    openTimeSlots: hours
    //}];

    var selectedDate = new Date();

    $scope.selectTime = selectTime;
    function selectTime(dateTime, parentIndex, childIndex) {
        selectedDate.setUTCDate(today.getDate() + offset + parentIndex);
        selectedDate.setUTCHours(18 + childIndex);
        selectedDate.setMinutes(0);
        selectedDate.setSeconds(0);
        selectedDate.setMilliseconds(0);
        $scope.selectedSlot = selectedDate.toISOString().slice(0, -1);
      //  $scope.selectedSlot = date.setDate();
        $scope.selectedParentIndex = parentIndex;
        $scope.selectedChildIndex = childIndex;
    }

    $scope.submitPickUpTime = submitPickUpTime;
    function submitPickUpTime() {
        var pickUpTime = {
            day: days[selectedDate.getDay()],
            month: monthNames[selectedDate.getMonth()],
            date: selectedDate.getDate(),
            year: selectedDate.getFullYear(),
            timeStart: (((selectedDate.getUTCHours() ) % 12) || 12) + ':00' + (selectedDate.getUTCHours() < 11 ? ' AM' : ' PM'),
            timeEnd: (((selectedDate.getUTCHours() + 1) % 12) || 12) + ':00' + (selectedDate.getUTCHours() < 11 ? ' AM' : ' PM')
        }
        phoneService.setPickUpTime(pickUpTime);
        $.ajax({
            type: "POST",
            url: '/PhoneSelection/SelectTimeSlot',
            data: { timeSlot: $scope.selectedSlot }
        })
        .then(
            function (data) {
                var address = {
                    address1: data.address1,
                    address2: data.address2,
                    city: data.city,
                    state: data.state,
                    zip: data.zip,
                }
                phoneService.setAddress(address);
                window.location = ("/#!/confirm");
                //window.location.reload();
                //$timeout(function () {
                //    // $scope.offer = data.offer;
                //    $scope.updateOffer({ offer: data.offer });
                //});
            }
        );
    }
}]);