app.factory('userServices', function ($http) {
    var userServicefactory = {};


    //function to get user:
    userServicefactory.getUsers = function (filter) {
        if (!filter)
            filter = "";
        return $http.get("http://localhost/InnoTm.API/odata/Users" + filter);

    }

    //function to create user:
    userServicefactory.createUsers = function (model) {
        return $http.post("http://localhost/InnoTm.API/odata/Users", model);
    }

    //function to update user:
    userServicefactory.updateUsers = function (model) {
        return $http.put("http://localhost/InnoTm.API/odata/Users(" + model.UserId + ")", model);
    }

    return userServicefactory;

});