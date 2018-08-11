app.controller('dashboardController', function ($scope, $rootScope, $filter, userServices, localStorageService, transactionService, SweetAlert) {
   
    $scope.addMoney = {};
    
    $rootScope.userData = localStorageService.get('userData');
   
    $scope.addMoney.current = $rootScope.userData.Amount;

    $scope.addMoneyfun = function () {
        $scope.addMoney.current = parseInt($scope.addMoney.current) + $scope.addMoney.add;
        $scope.addMoney.current = '' + $scope.addMoney.current;
        $rootScope.userData.Amount = $scope.addMoney.current;
        userServices.updateUsers($rootScope.userData).then(function (success) {
            localStorageService.set('userData', $rootScope.userData);
            //$scope.msg = 'Successfully added money to your account';
            //$scope.title = 'Successfull';
            //$('#msgModal').modal('show');
            SweetAlert.swal("Successfull!", "Added money to your account!", "success");
        }, function (error) {
            SweetAlert.swal("Error!", "Can't connect to server!", "error");
        });
    }

    //AddMoneyEnd


    $scope.transferMoney = {};
    $scope.sender = {};
    $scope.receiver = {};

    $scope.transferMoneyfun = function () {
        $scope.transferMoney.amount = '' + $scope.transferMoney.amount;
        if (parseInt($scope.transferMoney.amount) > parseInt($scope.userData.Amount)) {
            $scope.msg = 'Error: You don\'t have enough balance';
            $scope.title = 'Error!!';
            $('#msgModal').modal('show');
        } else if (parseInt($scope.transferMoney.phonenumber) == parseInt($scope.userData.PhoneNumber)) {
            $scope.msg = 'Error: Invalid Phone Number';
            $scope.title = 'Error!!';
            $('#msgModal').modal('show');
        } else {
            $scope.filter = $scope.transferMoney.phonenumber;
            //getReceiverDetails(GET)
            transactionService.getTransUser($scope.filter).then(function (success) {
                $scope.transUserData = success.data.value[0]; //GotDetails
                $scope.gotUser = false;
                if ($scope.transUserData) { $scope.gotUser = true; }
            }, function (error) {
                $scope.gotUser = false;
                alert("error");
            });
            $('#confirmTrans').modal('show');
        }
    }

    $scope.confirmTransFun = function () {
        //SenderObjectStart
        $scope.sender.UserId = $rootScope.userData.UserId;
        $scope.sender.RefId = $scope.transUserData.UserId;
        $scope.sender.TransType = 0;
        $scope.sender.InitialAmount = $rootScope.userData.Amount;
        $scope.sender.AmountTransfer = $scope.transferMoney.amount;
        $scope.sender.Date = $filter('date')(new Date(), 'yyyy-MM-ddThh:mm:ss');
        $scope.sender.Status = 1;
        //SenderObjectEnd

        //CreateSendersTransaction(POST)
        transactionService.createTransaction($scope.sender).then(function (response) {
            $rootScope.userData.Amount = parseInt($rootScope.userData.Amount) - parseInt($scope.transferMoney.amount); //Debit
            $rootScope.userData.Amount = '' + $rootScope.userData.Amount;
            //updateSendersAccount(PUT)
            userServices.updateUsers($rootScope.userData).then(function (success) {
                localStorageService.set('userData', $rootScope.userData);
                $scope.addMoney.current = $rootScope.userData.Amount; //updateAddMoneyCurrentValue
                //ReceiverObjectStart
                $scope.receiver.UserId = $scope.transUserData.UserId;
                $scope.receiver.RefId = $rootScope.userData.UserId;
                $scope.receiver.TransType = 1;
                $scope.receiver.InitialAmount = $scope.transUserData.Amount;
                $scope.receiver.AmountTransfer = $scope.transferMoney.amount;
                $scope.receiver.Date = $filter('date')(new Date(), 'yyyy-MM-ddThh:mm:ss');
                $scope.receiver.Status = 1;
                //ReceiverObjectEnd

                //CreateReceiversTransaction(POST)
                transactionService.createTransaction($scope.receiver).then(function (response) {
                    $scope.transUserData.Amount = parseInt($scope.transUserData.Amount) + parseInt($scope.transferMoney.amount);  //Credit
                    $scope.transUserData.Amount = '' + $scope.transUserData.Amount;
                    //UpdateReceiversAccount(PUT)
                    userServices.updateUsers($scope.transUserData).then(function (success) {
                        //$scope.msg = 'Transaction completed successfully';
                        //$scope.title = 'Successfull';
                        //$('#msgModal').modal('show');
                        SweetAlert.swal("Successfull!", "Transaction completed!", "success");
                    }, function (error) {
                        alert("error");
                    })
                }, function (error) {
                    alert("error");
                })
            }, function (error) {
                alert("error");
            })
        }, function (error) {
            alert("error");
        })
    }
    //TransferMoneyEnd

    $scope.updateProfile = {};
    $scope.updateProfile.UserId = $rootScope.userData.UserId;
    $scope.updateProfile.UserName = $rootScope.userData.UserName;
    $scope.updateProfile.Email = $rootScope.userData.Email;
    $scope.updateProfile.UserPassword = $rootScope.userData.UserPassword;
    $scope.updateProfile.PhoneNumber = $rootScope.userData.PhoneNumber;
    $scope.updateProfile.Amount = $rootScope.userData.Amount;

    //confirmUpdate
    $scope.confirmUpdateFun = function () {
        $scope.updateError = false;
        $('#confirmUpdateModal').modal('show');
    }

    //==============================================================================================================>>>>>>>>>>>
    $scope.updateProfilefun = function () {
        if ($scope.confirmPassword != $rootScope.userData.UserPassword) {
            $scope.updateError = true;
        } else {
            $('#confirmUpdateModal').modal('hide');
            $scope.updateProfile;
            userServices.updateUsers($scope.updateProfile).then(function (success) {
                localStorageService.set('userData', $scope.updateProfile);
                $rootScope.userData = localStorageService.get('userData');
                //$scope.msg = 'Update completed successfully';
                //$scope.title = 'Successfull';
                //$('#msgModal').modal('show');
                SweetAlert.swal("Successfull!", "Updated profile!", "success");
            }, function (error) {
                SweetAlert.swal("Error!", "Can't connect to server!", "error");
            });
        }
    }

    //UpdateProfileEnd

    $scope.history = [];
    $scope.getHistory = function () {
        transactionService.getTransHistory($rootScope.userData).then(function (success) {
            $scope.history = success.data.value;
        }, function (error) {
            alert("Server error");
        });
    }
    //PaymentHistoryEnd
})