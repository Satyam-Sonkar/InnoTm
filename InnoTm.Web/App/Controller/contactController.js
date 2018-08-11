app.controller('contactController', function ($scope, $rootScope, localStorageService, SweetAlert, $location) {
    $scope.userContact = {};
    $rootScope.userData = localStorageService.get('userData');
    $rootScope.loginStatus = localStorageService.get('loginStatus');

    if ($rootScope.loginStatus == true) {
        $scope.userContact.Contact = parseInt($rootScope.userData.PhoneNumber);
        $scope.userContact.Email = $rootScope.userData.Email;
        $scope.userContact.Name = $rootScope.userData.UserName;
    }

    $scope.submitfun = function () {
        SweetAlert.swal("Thank You!", "We appreciate your feedback", "success");
        $location.path('/Home');
    }
})