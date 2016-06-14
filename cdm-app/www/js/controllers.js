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


controllerModule.controller("contactsController", function($scope, $stateParams, customLocalStorage, sidebarUtils){
    $scope.texts = texts;
    $scope.language = customLocalStorage.getLanguage();
    $scope.prefix = 'contacts';
    $scope.menu_highlight = 'contacts';
    $scope.toggleSidebar = function () { sidebarUtils.showSidebar('contacts-sidebar-menu'); };
    ionic.DomUtil.ready(function(){
        sidebarUtils.sidebar_ready('contacts-sidebar-menu');
    });

});

controllerModule.controller("localController", function($scope, $stateParams, customLocalStorage, sidebarUtils){
    $scope.texts = texts;
    $scope.language = customLocalStorage.getLanguage();
    $scope.prefix = 'local';
    $scope.menu_highlight = 'localization';

    $scope.toggleSidebar = function () { sidebarUtils.showSidebar('local-sidebar-menu'); };
    ionic.DomUtil.ready(function(){
        sidebarUtils.sidebar_ready('local-sidebar-menu');
    });

});

controllerModule.controller("languageController", function($scope, $stateParams, customLocalStorage, sidebarUtils){
    $scope.texts = texts;
    $scope.language = customLocalStorage.getLanguage();
    $scope.prefix = 'language';
    $scope.menu_highlight = 'language';

    $scope.toggleSidebar = function () { sidebarUtils.showSidebar('language-sidebar-menu'); };
    ionic.DomUtil.ready(function(){
        sidebarUtils.sidebar_ready('language-sidebar-menu');
    });

    $scope.setLanguage = function (language){
        customLocalStorage.setLanguage(language);
        $scope.language = customLocalStorage.getLanguage();
    }

});


controllerModule.service('customLocalStorage', function () {
    var customLocalStorage = this;

    customLocalStorage.models = null;

    customLocalStorage.getModelInfoRemote = function(ready_function) {
        //console.log("vai ajax");
        jQuery.ajax({
            url: 'http://cdm-admin.herokuapp.com/api/everything',
            success: function(data){
                //console.log(data);
                //console.log("ajax sucesso");
                window.localStorage.setItem("models", JSON.stringify(data));
                customLocalStorage.models = data;
                ready_function(true);
            },
            error: function(err){
                //console.log(err);
                //console.log("ajax erro");
                if(window.localStorage.getItem("models") === undefined || window.localStorage.getItem("models") == null){
                    ready_function(false);
                }
                else{
                    customLocalStorage.models = JSON.parse(localStorage.getItem("models"));
                    ready_function(true);
                }
            },
            timeout: 7000 // sets timeout to 7 seconds
        });
        //return JSON.parse(localStorage.getItem("models"));
    };

    /*customLocalStorage.getModelInfo = function() {
        return JSON.parse(localStorage.getItem("models"));
    };*/

    customLocalStorage.getLanguage = function(){
        //window.localStorage.setItem("language", 'pt');
        if(window.localStorage.getItem("language") === undefined || window.localStorage.getItem("language") == null){
            window.localStorage.setItem("language", 'pt');
        }
        return window.localStorage.getItem("language");
    };

    customLocalStorage.setLanguage = function(language){
        window.localStorage.setItem("language", language);
    };
});
