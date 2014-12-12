        var model = {
        };
        var todoApp = angular.module("todoApp", []);
        todoApp.run(function ($http) {
            $http.get("https://cmprod-speakers.azurewebsites.net/api/sessionsdata").success(function (data) {
                model.sessions = data;
            });
        });
        todoApp.controller("ToDoCtrl", function ($scope) {
            $scope.codemash = model;

        });