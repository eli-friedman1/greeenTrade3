
myApp.controller('confirm', ['$scope', '$timeout', 'phoneService', function MyTabsController($scope, $timeout, phoneService) {
    $scope.timeSlot = phoneService.getPickUpTime();
    $scope.address = phoneService.getAddress();
    $scope.editAddress = false;
    $scope.newAddress = {};

    $scope.editTime = editTime;
    function editTime() {
        window.location = ("http://localhost/PhoneSelection#!/selectPickup");
    }

    $scope.saveNewAddress = saveNewAddress;
    function saveNewAddress() {
        $scope.editAddress = false;
        $scope.address = $scope.newAddress;
        $.ajax({
            type: "POST",
            url: 'http://localhost/PhoneSelection/UpdateSubmissionAddress',
            data: { address: $scope.newAddress.address1, city: $scope.newAddress.city, state: $scope.newAddress.state, zip: $scope.newAddress.zip, phone: $scope.newAddress.phone }
        })
        .then(
            function (data) {
                phoneService.setAddress($scope.newAddress);
            }
        );
    }
}])