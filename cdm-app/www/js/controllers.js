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


controllerModule.controller("contactsController", function($scope, $stateParams){
    $scope.contacts = $stateParams.contacts;
    $scope.prefix = 'contacts';
    //$scope.room_title = models[$stateParams.room].title.toUpperCase();
    $scope.toggleSidebar = function () { showSidebar('contacts-sidebar-menu'); };
    ionic.DomUtil.ready(function(){
        sidebar_ready('contacts-sidebar-menu');
    });

});

controllerModule.controller("localController", function($scope, $stateParams){
    $scope.contacts = $stateParams.contacts;
    $scope.prefix = 'local';
    //$scope.room_title = models[$stateParams.room].title.toUpperCase();
    $scope.toggleSidebar = function () { showSidebar('local-sidebar-menu'); };
    ionic.DomUtil.ready(function(){
        sidebar_ready('local-sidebar-menu');
    });

});


controllerModule.factory('ModelInfoService', function() {
    return {
        getModels: function() {
            if(window.localStorage.getItem("models") === undefined || window.localStorage.getItem("models") == null){
                //TODO - show loading screen overlay or something like that.
                window.localStorage.setItem("models", JSON.stringify(models1));
                //TODO - hide overlay after loading
            }
            return JSON.parse(localStorage.getItem("models"));
        }
    };
});
