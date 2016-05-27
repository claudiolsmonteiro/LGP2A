var controllerModule = angular.module('blank.controllers', ['ionic','blank.controllers', 'ngCordovaBeacon']);

/*
controllerModule.controller("panoramicController", function($scope, $stateParams){
    $scope.room = $stateParams.room;
    $scope.prefix = 'panorama';
    $scope.room_title = models[$stateParams.room].title.toUpperCase();
    ionic.DomUtil.ready(function() {
        panorama_init();
        sidebar_ready('panorama-sidebar-menu');
    });
});*/


controllerModule.controller("contactsController", function($scope, $stateParams, LocalStorageService){
    $scope.texts = texts;
    $scope.language = LocalStorageService.getLanguage();

    $scope.prefix = 'contacts';
    //$scope.room_title = models[$stateParams.room].title.toUpperCase();
    $scope.toggleSidebar = function () { showSidebar('contacts-sidebar-menu'); };
    ionic.DomUtil.ready(function(){
        sidebar_ready('contacts-sidebar-menu');
    });

});

controllerModule.controller("localController", function($scope, $stateParams, LocalStorageService){
    $scope.texts = texts;
    $scope.language = LocalStorageService.getLanguage();

    $scope.prefix = 'local';
    //$scope.room_title = models[$stateParams.room].title.toUpperCase();
    $scope.toggleSidebar = function () { showSidebar('local-sidebar-menu'); };
    ionic.DomUtil.ready(function(){
        sidebar_ready('local-sidebar-menu');
    });

});


controllerModule.factory('LocalStorageService', function() {
    return {
        getModelInfoRemote: function(ready_function) {
            jQuery.ajax({
                url: 'http://cdm-admin.herokuapp.com/api/everything',
                success: function(data){
                    //console.log(data);
                    window.localStorage.setItem("models", JSON.stringify(data));
                    ready_function(true);
                },
                error: function(err){
                    console.log(err);
                    if(window.localStorage.getItem("models") === undefined || window.localStorage.getItem("models") == null){
                        ready_function(false);
                    }
                    else ready_function(true);
                },
                timeout: 7000 // sets timeout to 7 seconds
            });


            //return JSON.parse(localStorage.getItem("models"));
        },
        getModelInfo: function() {
            return JSON.parse(localStorage.getItem("models"));
        },
        getLanguage: function(){
            if(window.localStorage.getItem("language") === undefined || window.localStorage.getItem("language") == null){
                window.localStorage.setItem("language", 'pt');
            }
            return window.localStorage.getItem("language");
        }
    };
});
