var controllerModule = angular.module('blank.controllers', []);

controllerModule.controller("tridimensionalModelController", function($scope, $window){
    ionic.Platform.ready(function(){
        // will execute when device is ready, or immediately if the device is already ready.

    });

    $scope.$on('$ionicView.beforeEnter', function(){
        //$window.location.reload(true); //doesn't work. reload loop...
    });

    ionic.DomUtil.ready(function(){
        //overlay_elements_ready();
        tridimensional_model_ready();
    });


});

/*

controllerModule.controller("panoramicController", function($scope){

});
*/
controllerModule.controller("roomController", function($scope, $stateParams){
    ionic.DomUtil.ready(function(){
        document.getElementById('top-info-bar').innerHTML = $stateParams.room.toUpperCase();
        room_ready($stateParams.room);
    });

});