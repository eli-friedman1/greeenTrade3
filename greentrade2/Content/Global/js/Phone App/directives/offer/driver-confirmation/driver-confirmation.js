
myApp.controller('confirm', ['$scope', '$timeout', 'phoneService', function MyTabsController($scope, $timeout, phoneService) {

    $scope.phoneData = phoneService.getPhoneData();
    $scope.timeSlot = phoneService.getPickUpTime();

    if ($scope.phoneData.offer == null) {
        window.location = ("/#!/phoneselection");
    } else if (!phoneService.loggedIn.value) {
        window.location = ("/#!/phoneselection");
    } else if ($scope.timeSlot == null) {
        window.location = ("/#!/selectpickup");
    }

    $scope.firstName = phoneService.firstName;

    
    $scope.address = phoneService.getAddress();
    $scope.editAddress = false;
    $scope.newAddress = {};

    $scope.editTime = editTime;
    function editTime() {
        window.location = ("/#!/selectpickup");
    }

    $scope.saveNewAddress = saveNewAddress;
    function saveNewAddress() {
        $scope.editAddress = false;
        $scope.address = $scope.newAddress;
        $.ajax({
            type: "POST",
            url: '/PhoneSelection/UpdateSubmissionAddress',
            data: { address: $scope.newAddress.address1, city: $scope.newAddress.city, state: $scope.newAddress.state, zip: $scope.newAddress.zip, phone: $scope.newAddress.phone }
        })
        .then(
            function (data) {
                phoneService.setAddress($scope.newAddress);
            },
            function (data) {
                phoneService.loggedIn.value = false;
                phoneService.firstName = null;
                window.location = ("/#!/login");
            }
        );
    }
}])