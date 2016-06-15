var controllerModule = angular.module('blank.controllers', ['ionic','blank.controllers', 'ngCordovaBeacon']);


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
        //descomentar primeira linha e comentar o restante para usar dados locais (se disponiveis)
        //customLocalStorage.models = JSON.parse(localStorage.getItem("models")); ready_function(true);
        jQuery.ajax({
            url: 'http://cdm-admin.herokuapp.com/api/everything',
            success: function(data){
                window.localStorage.setItem("models", JSON.stringify(data));
                customLocalStorage.models = data;
                ready_function(true);
            },
            error: function(err){
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



controllerModule.service('beaconsService', function (customLocalStorage, $cordovaBeacon, $rootScope, $state) {
    var beaconsService = this;

    beaconsService.beacons_detected = [];
    beaconsService.beacons_unique_uuids = []; //array with uuids (no duplicates);
    beaconsService.initialized = false;

    beaconsService.init = function (){
        if(beaconsService.initialized)
            return;

        var temp_uuids = [];
        for(var key in customLocalStorage.models){
            var temp_key = customLocalStorage.models[key].beacon_uuid+':'+customLocalStorage.models[key].beacon_major+':'+customLocalStorage.models[key].beacon_minor;
            beaconsService.beacons_detected[temp_key] = {};
            beaconsService.beacons_detected[temp_key].detected = false; //will determine if the user has already been prompted for this beacon
            beaconsService.beacons_detected[temp_key].model_key = key;
            temp_uuids.push(customLocalStorage.models[key].beacon_uuid);
        }

        $.each(temp_uuids, function(i, el){ //populate beacons_unique_uuids with unique values from the uuids temp array
            if($.inArray(el, beaconsService.beacons_unique_uuids) === -1 && el != undefined) beaconsService.beacons_unique_uuids.push(el);
        });

        beaconsService.initialized = true;
    };

    beaconsService.start_ranging = function(){
        if(!beaconsService.initialized)
            beaconsService.init();

        var language = customLocalStorage.getLanguage();

        try {
            $cordovaBeacon.requestWhenInUseAuthorization();
            $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult) {
                var uniqueBeaconKey;
                console.log( pluginResult.beacons );
                for(var i = 0; i < pluginResult.beacons.length; i++) {
                    uniqueBeaconKey = pluginResult.beacons[i].uuid + ":" + pluginResult.beacons[i].major + ":" + pluginResult.beacons[i].minor;
                    if(pluginResult.beacons[i].accuracy < 3.0 && beaconsService.beacons_detected[uniqueBeaconKey].detected === false){
                        beaconsService.beacons_detected[uniqueBeaconKey].detected = true;
                        var prompt_result =
                            window.confirm('Está perto de:\n' +
                                customLocalStorage.models[beaconsService.beacons_detected[uniqueBeaconKey].model_key].translations[language].name + '\n' +
                                'Deseja ver mais informação?');
                        if(prompt_result){ //navigate to detected room
                            $state.go('room' , {room: beaconsService.beacons_detected[uniqueBeaconKey].model_key }, {reload: true, inherit: false, notify: true} ) ;
                            break;
                        }
                    }
                }
            });

            for(var key in beaconsService.beacons_unique_uuids){
                $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion(
                    "beacon-" + beaconsService.beacons_unique_uuids[key], beaconsService.beacons_unique_uuids[key]));
            }
        }catch(e) {
            //ignoring error. probably because running app in browser (development), not in device.
            console.log('exception catched in beacons init.');
            console.log(e);
        }
    }
});
