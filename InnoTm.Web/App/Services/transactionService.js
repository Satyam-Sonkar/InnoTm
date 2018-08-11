app.factory('transactionService', function ($http) {
    var transactionServicefactory = {};

    //function to get Transuser:
    transactionServicefactory.getTransUser = function (filter) {
        return $http.get("http://localhost/InnoTm.API/odata/Users?$filter=PhoneNumber eq " + "'" + filter + "'");
    }

    //function to create transaction:
    transactionServicefactory.createTransaction = function (model) {
        return $http.post("http://localhost/InnoTm.API/odata/Transactions", model);
    }

    //function to get transaction history:
    transactionServicefactory.getTransHistory = function (model) {
        return $http.get("http://localhost/InnoTm.API/odata/Transactions?$filter=UserId eq " + model.UserId + "&$expand=User");
    }

    return transactionServicefactory;

});