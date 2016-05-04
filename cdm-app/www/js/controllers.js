var controllerModule = angular.module('blank.controllers', []);

controllerModule.controller("tridimensionalModelController", function($scope, $stateParams){
    // set to either landscape


    ionic.Platform.ready(function(){
        // will execute when device is ready, or immediately if the device is already ready.

        console.log(screen);
        if(screen.lockOrientation) {
            //screen.lockOrientation('landscape');
        }
        console.log(screen.orientation);

        /*window.addEventListener("orientationchange", function() {
          console.log(window.orientation);
          tridimensional_model_ready();
        }, false);*/
    });


    ionic.DomUtil.ready(function(){
        //overlay_elements_ready();
        console.log($stateParams.current_room);
        tridimensional_model_ready($stateParams.current_room);
        sidebar_ready();
    });

});

controllerModule.controller("panoramicController", function($scope, $stateParams){
    $scope.room = $stateParams.room;
    $scope.room_title = models[$stateParams.room].title.toUpperCase();
    ionic.DomUtil.ready(function() {
        panorama_init();
        sidebar_ready();
    });
});

controllerModule.controller("roomController", function($scope, $stateParams){
    $scope.room = $stateParams.room;
    $scope.room_title = models[$stateParams.room].title.toUpperCase();
    ionic.DomUtil.ready(function(){
        room_ready($stateParams.room);
        sidebar_ready();
    });

});
