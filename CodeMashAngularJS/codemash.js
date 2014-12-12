        var model = {
        };
        var todoApp = angular.module("todoApp", []);
        todoApp.run(function ($http) {
            $http.get("sessionsData.json").success(function (data) {
                model.sessions = data;
            });
        });
        todoApp.controller("ToDoCtrl", function ($scope) {
            $scope.codemash = model;

        });