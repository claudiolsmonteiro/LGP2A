/**
 * Created by João on 11/04/2016.
 */
/**
 * Created by João on 10/03/2016.
 */

controllerModule.controller("roomController", function($scope, $stateParams, $state, customLocalStorage){

    ////////////////////
    $scope.texts = texts;
    $scope.language = customLocalStorage.getLanguage();
    ////////////////////

    ionic.Platform.ready(function() {
        // will execute when device is ready, or immediately if the device is already ready.
        //console.log(screen);
        if (screen.lockOrientation) {
            screen.lockOrientation('landscape');
        }
    });

    $scope.room = $stateParams.room;
    $scope.prefix = 'room';
    $scope.room_title = customLocalStorage.models[$stateParams.room].translations[$scope.language].name.toUpperCase();
    $scope.room_description = customLocalStorage.models[$stateParams.room].translations[$scope.language].description;

    //panorama_available -> true if the room as a panoramic picture.
    //if not, the option won't be shown in the bottom navbar
    $scope.panorama_available = false;

    $scope.next_room_available = (customLocalStorage.models[$scope.room].next_room != null);
    $scope.next_room_id = customLocalStorage.models[$scope.room].next_room;
    $scope.goToNextRoom = function() { $state.go('room' , {room: customLocalStorage.models[$scope.room].next_room }, {reload: true, inherit: false, notify: true} ) ; }

    if (customLocalStorage.models[$scope.room].photo != null && customLocalStorage.models[$scope.room].photo != undefined)
        $scope.panorama_available = true;

    $scope.showRoomModel = function () { $scope.showRoomModelAux($scope.environment.current_room); };
    $scope.showPanorama = function () { $scope.showRoomPanorama(); };
    $scope.showPopup = function () { $scope.room_show_more_info_popup($scope.environment.current_room); };
    $scope.hidePopup = function () { $scope.room_hide_more_info_popup($scope.environment.current_room); };
    $scope.toggleSidebar = function () { showSidebar('room-sidebar-menu'); };

    ionic.DomUtil.ready(function(){
        $scope.environment = construct_tridimensional_environment([0,150,400]);
        $scope.environment.current_room = $stateParams.room;
        $scope.room_ready();
        sidebar_ready('room-sidebar-menu');
    });

    // ROOM MODEL FUNCTIONS

    $scope.room_panorama_initialized = null;

    $scope.room_ready = function(){
        $scope.room_panorama_initialized = null;
        $scope.room_init();
    };

    $scope.room_increment_textures_loaded = function(){
        //in room there is only one object and one texture
        //so it will always return true.
        return true;
    };

    $scope.room_init = function() {

        var ambient = new THREE.AmbientLight( 0x333333 );
        $scope.environment.scene.add( ambient );

        var pointLight = new THREE.PointLight( 0xeeeeee, 1.4, 1000 );
        pointLight.position.set( 500, 200, 500 );
        $scope.environment.lights.push(pointLight);

        pointLight = new THREE.PointLight( 0xeeeeee, 1.4, 1000 );
        pointLight.position.set( -500, 200, 500 );
        $scope.environment.lights.push(pointLight);

        pointLight = new THREE.PointLight( 0xeeeeee, 1, 1000 );
        pointLight.position.set( 0, 700, 0 );
        $scope.environment.lights.push(pointLight);

        pointLight = new THREE.PointLight( 0xeeeeee, 1, 1000 );
        pointLight.position.set( 0, -500, 0 );
        $scope.environment.lights.push(pointLight);

        pointLight = new THREE.PointLight( 0xeeeeee, 1.4, 1000 );
        pointLight.position.set( -500, 200, -500 );
        $scope.environment.lights.push(pointLight);

        pointLight = new THREE.PointLight( 0xeeeeee, 1.4, 1000 );
        pointLight.position.set( 500, 200, -500 );
        $scope.environment.lights.push(pointLight);

        for (var i in $scope.environment.lights){
            $scope.environment.scene.add($scope.environment.lights[i]);
        }

        //load model - está comentada a linha do modelo DAE porque a app fica muito pesada.
        // descomentar o DAE e comentar a linha abaixo (loadTexture) para usar o modelo detalhado
        //loadDAE($scope.environment, customLocalStorage.models[$scope.room].model_detail_path, [0,0,0], 5);
        loadTexture($scope.environment, $scope.environment.current_room, customLocalStorage.models[$scope.environment.current_room].texture_path, $scope.room_increment_textures_loaded, $scope.room_loadObjects, $scope.room_animate);
        console.log(customLocalStorage.models[$scope.room]);

        $scope.environment.renderer.domElement.setAttribute('id', 'main-canvas');

        var canvas_id = $scope.environment.current_room+'-canvas-container';
        document.getElementById(canvas_id).html = '';
        document.getElementById(canvas_id).appendChild( $scope.environment.renderer.domElement );

        window.addEventListener("orientationchange", function(){
            //console.log(screen.orientation); // e.g. portrait
            $scope.environment.camera.aspect = window.screen.width / window.screen.height;
            $scope.environment.camera.updateProjectionMatrix();
            $scope.environment.renderer.setSize( window.screen.width, window.screen.height);
        });

        var axes = buildAxes( 1000 );
        $scope.environment.scene.add(axes);

        $scope.room_animate();
    };

    $scope.room_animate = function() {

        $scope.requestAnimationFrameId = requestAnimationFrame( function() {$scope.room_animate();} );
        $scope.environment.renderer.render( $scope.environment.scene, $scope.environment.camera );
    };

    $scope.room_loadObjects = function(){
        loadObjModel($scope.environment, $scope.environment.current_room, [0, -25, 0], 100, 0.5, false, null, customLocalStorage.models[$scope.environment.current_room], $scope.language);
    };

    $scope.room_show_more_info_popup = function(room_id){
        jQuery('#'+room_id+'-more-info-modal').show();
        jQuery('#'+room_id+'-more-info-modal-background').show();
    };

    $scope.room_hide_more_info_popup = function(room_id){
        jQuery('#'+room_id+'-more-info-modal').hide();
        jQuery('#'+room_id+'-more-info-modal-background').hide();
    };

    // OTHERS

    $scope.$on("$destroy", function(){
        console.log('destroying threejs room context');
        cancelAnimationFrame($scope.requestAnimationFrameId);// Stop the animation
        $scope.environment.renderer.domElement.addEventListener('dblclick', null, false); //remove listener to render
        $scope.environment.scene = null;
        //$scope.environment.projector = null;
        $scope.environment.camera = null;
        $scope.environment.controls = null;
        jQuery('#'+$scope.environment.current_room+'-canvas-container').empty();
    });

});
