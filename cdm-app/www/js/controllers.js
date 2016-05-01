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

controllerModule.controller("panoramicController", function($scope, $stateParams){
    $scope.room = $stateParams.room;
    $scope.room_title = models[$stateParams.room].title.toUpperCase();
    ionic.DomUtil.ready(function() {
        panorama_init();
    });
});

controllerModule.controller("roomController", function($scope, $stateParams){
    $scope.room = $stateParams.room;
    $scope.room_title = models[$stateParams.room].title.toUpperCase();
    ionic.DomUtil.ready(function(){
        room_ready($stateParams.room);
    });

});