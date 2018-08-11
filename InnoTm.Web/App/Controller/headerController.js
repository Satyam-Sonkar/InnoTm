app.controller('headerController', function ($scope, $rootScope, $location, localStorageService, userServices, SweetAlert) {
    //getStatus

    $rootScope.loginStatus = false;
    if (localStorageService.get('loginStatus')) {
        $rootScope.loginStatus = true;
        $rootScope.userData = localStorageService.get('userData');
    }

    //registerObject
    $scope.registerData = {};
    
    $scope.registerfun = function () {

        $scope.registerData;
        $scope.registerData.PhoneNumber = '' + $scope.registerData.PhoneNumber;
        $scope.registerData.ImgUrl = null;
        $scope.registerData.Amount = '100.00';
        userServices.createUsers($scope.registerData).then(function (success) {
            $('#Register').modal('hide');
            //$('#doneRegModal').modal('show');
            SweetAlert.swal("Successfull!", "Registered successfully!", "success");
        },function(error){
            //alert("Server error");
            SweetAlert.swal("Error!", "Can't connect to server!", "error");
        });
    };


    //RegisterEnd
    //==============================================================================================>>>>>>>
    //LoginStart


    //loginObject
    $scope.loginData = {};

    $scope.loginfun = function () {

        $scope.user = [];

        userServices.getUsers().then(function (response) {
            $scope.user = response.data.value;
            var status = 1;
            angular.forEach($scope.user, function (value, key) {
                if (value.Email == $scope.loginData.Email && value.UserPassword == $scope.loginData.Password) {
                    $rootScope.userData = value;
                    localStorageService.set('loginStatus', true);
                    $scope.loginError = false;
                    status = 2;
                    localStorageService.set('userData', value);
                    $rootScope.loginStatus = localStorageService.get('loginStatus');
                    $('#Login').modal('hide');
                    $location.path('/Dashboard');
                }

                else if (($scope.user.length - 1) == key && status == 1) {
                    $scope.loginError = true;
                }

            });

        },function(error){
            alert("Server error");
        });
    }


    //LoginEnd
    //==============================================================================================>>>>>>>
    //SignOutStart


    $scope.signOutfun = function () {

        SweetAlert.swal({
            title: "Are you sure?",
            text: "You want to logout",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            closeOnConfirm: false,
            closeOnCancel: true
        },
        function (isConfirm) {
            if (isConfirm) {
                localStorageService.clearAll();
                $rootScope.loginStatus = false;
                //$('#signOutmodal').modal('hide')
                $location.path('/Home');
                SweetAlert.swal("Logout!", "See you soon :)", "success");
            } 
        });
    }

});