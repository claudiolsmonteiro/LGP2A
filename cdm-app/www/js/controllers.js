var controllerModule = angular.module('blank.controllers', []);

controllerModule.controller("tridimensionalModelController", function($scope, $stateParams, $ionicPopover){
    // set to either landscape
    $scope.prefix = 'model';

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

    // .fromTemplate() method
    var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';
    $scope.popover = $ionicPopover.fromTemplate(template, {
        scope: $scope
    });
    // .fromTemplateUrl() method
    $ionicPopover.fromTemplateUrl('my-popover.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popover = popover;
    });
    $scope.openSelectRoomPopover = function($event) {
        $scope.popover.show($event);
    };
    $scope.closePopover = function() {
        $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.popover.remove();
    });
    // Execute action on hide popover
    $scope.$on('popover.hidden', function() {
        // Execute action
    });
    // Execute action on remove popover
    $scope.$on('popover.removed', function() {
        // Execute action
    });

    $scope.toggleSidebar = function () { showSidebar('model-sidebar-menu'); };
    $scope.animateRoom = function ( room_id ) { animateObjectAux(room_id , $scope.environment); $scope.closePopover(); };
    ionic.DomUtil.ready(function(){
        //overlay_elements_ready();
        console.log($stateParams.current_room);
        $scope.environment = construct_tridimensional_environment([0,200,400]);
        $scope.environment.current_room = $stateParams.current_room;
        tridimensional_model_ready($scope.environment);
        sidebar_ready('model-sidebar-menu');

    });




});
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

controllerModule.controller("roomController", function($scope, $stateParams){
    $scope.room = $stateParams.room;
    $scope.prefix = 'room';
    $scope.room_title = models[$stateParams.room].title.toUpperCase();


    //panorama_available -> true if the room as a panoramic picture.
    //if not, the option won't be shown in the bottom navbar
    $scope.panorama_available = false;
    if (models[$scope.room].panorama_paths)
      $scope.panorama_available = true;

    $scope.showPanorama = function () { showRoomPanorama($scope.environment); };
    $scope.toggleSidebar = function () { showSidebar('room-sidebar-menu'); };
    ionic.DomUtil.ready(function(){
        $scope.environment = construct_tridimensional_environment([0,150,400]);
        $scope.environment.current_room = $stateParams.room;
        room_ready($scope.environment);
        sidebar_ready('room-sidebar-menu');
    });

});

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
