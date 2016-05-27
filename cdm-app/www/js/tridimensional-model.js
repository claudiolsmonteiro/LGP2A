/**
 * Created by João on 10/03/2016.
 */

controllerModule.controller("tridimensionalModelController", function($scope, $rootScope, $stateParams, $ionicPopover, $cordovaBeacon, $state, LocalStorageService, $ionicLoading){
    //ionic.Platform.fullScreen(true, false);

    $scope.getRemoteModels = function (){
        $ionicLoading.hide();
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        $scope.models = LocalStorageService.getModelInfoRemote($scope.model_ready);
    };

    /*
     @param success - boolean indicating weather the remote loading of models worked.
     */
    $scope.model_ready = function(success){
        $ionicLoading.hide();
        var template_modal =
            '<div class="custom-modal">'+
            '<div class="modal-title">Connection problem</div>'+
            '<div class="modal-body">Check your internet connection...</div>'+
            '<div class="modal-buttons button-bar">'+
            '<button class="button button-outline button-small button-light" ng-click="getRemoteModels()">'+
            'Try again'+
            '</button>'+
            '</div>'+
            '</div>';

        if(success){
            $scope.models = LocalStorageService.getModelInfo();
            ionic.Platform.ready(function(){
                // will execute when device is ready, or immediately if the device is already ready.
                //console.log(screen);
                if(screen.lockOrientation) {
                    screen.lockOrientation('landscape');
                }
                //console.log(screen.orientation);

                /*window.addEventListener("orientationchange", function() {
                 console.log(window.orientation);
                 tridimensional_model_ready();
                 }, false);*/
                $scope.beacons_init();
                try {
                    // BEACONS
                    $cordovaBeacon.requestWhenInUseAuthorization();
                    $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult) {
                        var uniqueBeaconKey;
                        console.log( pluginResult.beacons);
                        for(var i = 0; i < pluginResult.beacons.length; i++) {
                            uniqueBeaconKey = pluginResult.beacons[i].uuid + ":" + pluginResult.beacons[i].major + ":" + pluginResult.beacons[i].minor;
                            //$scope.beacons[uniqueBeaconKey] = pluginResult.beacons[i];
                            if(pluginResult.beacons[i].accuracy < 3.0 && $scope.beacons_detected[uniqueBeaconKey].detected === false){
                                $scope.beacons_detected[uniqueBeaconKey].detected = true;
                                var prompt_result =
                                    window.confirm('Está perto de:\n' +
                                        $scope.models[$scope.beacons_detected[uniqueBeaconKey].model_key].translations[$scope.language].name + '\n' +
                                        'Deseja ver mais informação?');
                                if(prompt_result){ //navigate to detected room
                                    $state.go('room' , {room: $scope.beacons_detected[uniqueBeaconKey].model_key }, {reload: true, inherit: false, notify: true} ) ;
                                }
                            }
                        }
                        //$scope.$apply();
                        //console.log($scope.beacons);
                    });

                    console.log($scope.beacons_unique_uuids);
                    for(var key in $scope.beacons_unique_uuids){
                        $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion(
                            "beacon-" + $scope.beacons_unique_uuids[key], $scope.beacons_unique_uuids[key]));
                    }
                    // /BEACONS
                }catch(e) {
                    //ignoring error. probably cause because running app in browser (development), not in device.
                }



            });

            ionic.DomUtil.ready(function(){
                $scope.environment.current_room = $stateParams.current_room;
                $scope.tridimensional_model_init();
                sidebar_ready('model-sidebar-menu');
            });
        }
        else{
            $ionicLoading.show({
                template: template_modal,
                scope: $scope,
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 400,
                showDelay: 0
            });
        }

    };

    ////////////////////
    $scope.getRemoteModels();
    console.log($scope.models);
    $scope.texts = texts;
    $scope.language = LocalStorageService.getLanguage();
    $scope.environment = construct_tridimensional_environment([0,200,400]);
    $scope.prefix = 'model';
    ////////////////////



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
    $scope.animateRoom = function ( room_id ) { $scope.animateObjectAux(room_id); $scope.closePopover(); };


    // FUNCTIONS

    $scope.model_increment_textures_loaded = function(){
        $scope.environment.textures_loaded++;
        return Object.size($scope.models) == $scope.environment.textures_loaded;
    }

    $scope.tridimensional_model_init = function() {

        document.addEventListener( 'mousedown', function( e ) { $scope.onDocumentMouseDown( e );}, true );

        var ambient = new THREE.AmbientLight( 0x333333 );
        $scope.environment.scene.add( ambient );

        /*var directionalLight = new THREE.DirectionalLight( 0x555555 );
         directionalLight.position.set( 1, 0, 1 ).normalize();
         $scope.environment.scene.add( directionalLight );

        var directionalLight2 = new THREE.DirectionalLight( 0x555555 );
        directionalLight2.position.set( 1, 0, -1 ).normalize();
        $scope.environment.scene.add( directionalLight2 );

        var directionalLight3 = new THREE.DirectionalLight( 0x555555 );
        directionalLight3.position.set( -1, 0, 1 ).normalize();
        $scope.environment.scene.add( directionalLight3 );

        var directionalLight4 = new THREE.DirectionalLight( 0xaaaaaa );
        directionalLight4.position.set( -1, 0, -1 ).normalize();
        $scope.environment.scene.add( directionalLight4 );*/
        /*var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
        $scope.environment.scene.add(hemiLight);*/
      /*var directionalLight2 = new THREE.DirectionalLight( 0xffeedd );
      directionalLight2.position.set( 0, 0, 1 ).normalize();
      scene.add( directionalLight2 );*/

        var pointLight = new THREE.PointLight( 0xeeeeee, 1.7, 1000 );
        pointLight.position.set( 500, 200, 500 );
        $scope.environment.lights.push(pointLight);

        var pointLight2 = new THREE.PointLight( 0xeeeeee, 1.7, 1000 );
        pointLight2.position.set( -500, 200, 500 );
        $scope.environment.lights.push(pointLight2);

        var pointLight3 = new THREE.PointLight( 0xeeeeee, 1, 1000 );
        pointLight3.position.set( 0, 700, 0 );
        $scope.environment.lights.push(pointLight3);

        var pointLight4 = new THREE.PointLight( 0xeeeeee, 1.7, 1000 );
        pointLight4.position.set( -500, 200, -500 );
        $scope.environment.lights.push(pointLight4);

        var pointLight5 = new THREE.PointLight( 0xeeeeee, 1.7, 1000 );
        pointLight5.position.set( 500, 200, -500 );
        $scope.environment.lights.push(pointLight5);

        var pointLight6 = new THREE.PointLight( 0xeeeeee, 1, 1000 );
        pointLight6.position.set( 0, -400, 200);
        $scope.environment.lights.push(pointLight6);

        //testes vidro
        /*var pointLight = new THREE.PointLight( 0xeeeeee, 1.7, 1000 );
        pointLight.position.set( 0, 0, 500 );
        $scope.environment.lights.push(pointLight);

        var pointLight2 = new THREE.PointLight( 0xeeeeee, 1.7, 700 );
        pointLight2.position.set( 100, 0, -500 );
        $scope.environment.lights.push(pointLight2);*/

        for (var i in $scope.environment.lights){
            $scope.environment.scene.add($scope.environment.lights[i]);
        }

        //textures
        for(var key in $scope.models){
            loadTexture($scope.environment, key, $scope.models[key].texture_path, $scope.model_increment_textures_loaded, $scope.model_loadObjects, $scope.tridimensional_model_animate);
        }

        window.addEventListener("orientationchange", function(){
            //console.log(screen.orientation); // e.g. portrait
            $scope.environment.camera.aspect = window.screen.width / window.screen.height;
            $scope.environment.camera.updateProjectionMatrix();
            $scope.environment.renderer.setSize( window.screen.width, window.screen.height);

        });

        // Listen for resize changes
        window.addEventListener("resize", function() {
            $scope.environment.camera.aspect = window.screen.width / window.screen.height;
            $scope.environment.camera.updateProjectionMatrix();
            $scope.environment.renderer.setSize( window.screen.width, window.screen.height);
        }, false);


        $scope.environment.renderer.domElement.setAttribute('id', 'model-main-canvas');
        document.getElementById('model-canvas-container').html = '';
        document.getElementById('model-canvas-container').appendChild( $scope.environment.renderer.domElement );


       /* var axes = buildAxes( 1000 );
        $scope.environment.scene.add(axes);
*/
    }

    $scope.tridimensional_model_animate = function() {
        /*console.log('#########################################');
         console.log('textures loaded: ' + model_textures_loaded);
         console.log('$scope.models size: ' +  Object.size($scope.models));
         console.log(model_objects_loaded? 'objects started loading ' : 'objects didn\'t start loading');
         console.log(model_textures);
         console.log('#########################################');
         */
        requestAnimationFrame( function(){$scope.tridimensional_model_animate()} );

        var temp_millis = (new Date()).getTime();
        if(temp_millis - $scope.environment.last_animation > 20){
            $scope.environment.last_animation = temp_millis;
            for(var key in $scope.environment.objects){
                $scope.animateObject($scope.environment.objects[key]);
            }
        }
        $scope.environment.renderer.render( $scope.environment.scene, $scope.environment.camera );

    };

    $scope.model_loadObjects = function(){
        var y_coord = 0;
        for(var key in $scope.models){
            var active = false;
            if($scope.environment.current_room != null && $scope.environment.current_room == key)
                active = true;
            if($scope.models[key].model_dae_path != null)
              loadDAE($scope.environment, key, [0, y_coord, 0], 10, 0.5, active, $scope.objCallback, $scope.models, $scope.language);
            else if($scope.models[key].material_path != null)
              loadObjMtl($scope.environment, key, [0, y_coord, 0], 100, 0.5, active, $scope.objCallback, $scope.models, $scope.language);
            else loadObjModel($scope.environment, key, [0, y_coord, 0], 100, 0.5, active, $scope.objCallback, $scope.models[key], $scope.language);
        }
    };

    $scope.onDocumentMouseDown = function( event ) {
        if(event.target.getAttribute('id') == 'model-main-canvas'){

            $scope.environment.mouseVector.x = ( event.clientX / $scope.environment.renderer.domElement.clientWidth ) * 2 - 1;
            $scope.environment.mouseVector.y = - ( event.clientY / $scope.environment.renderer.domElement.clientHeight ) * 2 + 1;

            //$scope.environment.raycaster = new THREE.Raycaster();
            $scope.environment.raycaster.setFromCamera( $scope.environment.mouseVector.clone(), $scope.environment.camera );
            var intersects = $scope.environment.raycaster.intersectObjects( $scope.environment.pickable_objects, true );

            /*console.log('1---------------------------------------------------');
             console.log('##$$processing touch');
             console.log('mouse x: ' + model_mouseVector.x + ' -- mouse y: ' + model_mouseVector.y);
             console.log('event x: ' + event.clientX + ' -- event y: ' + event.clientY);
             console.log('position top: ' + position.top + ' -- position left: ' + position.left);
             console.log('width: ' + model_renderer.domElement.width + ' -- height: ' + model_renderer.domElement.height);
             console.log('intersects length: ' + intersects.length);
             console.log('---------------------------------------------------');*/

            if(intersects.length == 0)
                return;

            //only the first intersection
            var obj = intersects[0].object;
            obj.callback();
        }
    };

    $scope.animateObjectAux = function(room_id){
        $scope.environment.objects[room_id].mesh.callback();
    };

    $scope.animateObject = function(object){
        if(object.animation_state == 0 || object.animation_state == 2){
            return;
        }

        var current_millis = (new Date()).getTime();
        var animation_percentage = (current_millis - object.current_animation_start_time)/1000.0 / object.animation_span;

        if(animation_percentage >= 1){ //if percentage > 100%, animation's over.
            object.animation_state = (object.animation_state + 1) % 4;
            if(object.animation_state == 2){
                $scope.showObjectInfoOverlayMenus(object.name, object.title)
                //correct position to the exact one.
                object.position.x = object.original_position[0] + object.animation[0];
                object.position.y = object.original_position[1] + object.animation[1];
                object.position.z = object.original_position[2] + object.animation[2];
            }
            else{// state == 0
                $scope.hideObjectInfoOverlayMenus(object.name);

                //correct position to the exact one.
                object.position.x = object.original_position[0];
                object.position.y = object.original_position[1];
                object.position.z = object.original_position[2];
            }
            //check if there are animations yet to be performed.
            if(object.pendent_animations > 0){
                object.pendent_animations--;
                object.current_animation_start_time = (new Date()).getTime();
                object.animation_state = (object.animation_state + 1) % 4;
            }

            return;
        }

        if(object.animation_state == 3){
            animation_percentage = 1 - animation_percentage;
            //if state == 3, we're dealing with the inverse animation, so the position must be decremented, not incremented.
        }

        object.position.x = object.original_position[0] + animation_percentage*object.animation[0];
        object.position.y = object.original_position[1] + animation_percentage*object.animation[1];
        object.position.z = object.original_position[2] + animation_percentage*object.animation[2];

    };

    $scope.showObjectInfoOverlayMenus = function(objectName, objectTitle){
        jQuery('#top-info-bar').html(objectTitle.toUpperCase());

        jQuery('#top-info-bar').attr('data-current-object', objectName);
        jQuery('#room_link').attr('href', '#/room/'+objectName);
        jQuery('#top-info-bar').slideDown();
        jQuery('#bottom-navbar').slideDown();
    };

    $scope.hideObjectInfoOverlayMenus = function(objectName, objectTitle){

        if (jQuery('#top-info-bar').attr('data-current-object') == objectName){
            jQuery('#top-info-bar').slideUp();
            jQuery('#bottom-navbar').slideUp();
        }
    };

    $scope.objCallback = function(model_id, object){
        //console.log(object);
        if(object.animation == null)
            return;

        //if current animated object's animation is still in progress, ignore (return immediately).
        if($scope.environment.current_animated_object_name != null &&
            ( $scope.environment.objects[$scope.environment.current_animated_object_name].animation_state == 1
            || $scope.environment.objects[$scope.environment.current_animated_object_name].animation_state == 3) ) {
            //console.log('ignoring click. other object being animated');
            return;
        }

        //console.log( model_id );
        if(object.animation_state == 1 || object.animation_state == 3){
            //console.log('ignoring click. other animation for this object in progress.');
            return;
        }
        object.animation_state = (object.animation_state + 1) % 4;
        object.current_animation_start_time = (new Date()).getTime();
        if(object.animation_state == 1){ //if positioning this object, put all the others back to their original position
            $scope.objectsBackToOriginalPositionExcept(object);
            $scope.environment.current_animated_object_name = object.name;
        }
        else if (object.animation_state == 3){ //if positioning this object in its original position, immediately hide all menus
            $scope.hideObjectInfoOverlayMenus(object.name);
        }
        //console.log('new animation state: ' + object.animation_state);
    };

    $scope.objectsBackToOriginalPositionExcept = function (object) {
        for(var key in $scope.environment.objects){
            if(key != object.name){
                if($scope.environment.objects[key].animation_state == 2){
                    $scope.environment.objects[key].current_animation_start_time = (new Date()).getTime();
                    $scope.environment.objects[key].animation_state++;
                    $scope.hideObjectInfoOverlayMenus($scope.environment.objects[key].name);
                }
                else if($scope.environment.objects[key].animation_state == 1){
                    $scope.environment.objects[key].pendent_animations++;
                }
            }
        }
    };

    $scope.beacons_init = function (){
        $scope.beacons = {};
        $scope.beacons_detected = [];
        var temp_uuids = [];
        for(var key in $scope.models){
            var temp_key = $scope.models[key].beacon_uuid+':'+$scope.models[key].beacon_major+':'+$scope.models[key].beacon_minor;
            $scope.beacons_detected[temp_key] = {};
            $scope.beacons_detected[temp_key].detected = false; //will determine if the user has already been prompted for this beacon
            $scope.beacons_detected[temp_key].model_key = key;
            temp_uuids.push($scope.models[key].beacon_uuid);
        }
        $scope.beacons_unique_uuids = []; //array with uuids (no duplicates);
        $.each(temp_uuids, function(i, el){ //populate beacons_unique_uuids with unique values from the uuids temp array
            if($.inArray(el, $scope.beacons_unique_uuids) === -1 && el != undefined) $scope.beacons_unique_uuids.push(el);
        });
    };
});


function buildAxes( length ) {
    var axes = new THREE.Object3D();

    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( length, 0, 0 ), 0xFF0000, false ) ); // +X
    //axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( -length, 0, 0 ), 0xFF0000, true) ); // -X
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, length, 0 ), 0x00FF00, false ) ); // +Y
    //axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, -length, 0 ), 0x00FF00, true ) ); // -Y
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, length ), 0x0000FF, false ) ); // +Z
    //axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -length ), 0x0000FF, true ) ); // -Z

    return axes;

}

function buildAxis( src, dst, colorHex, dashed ) {
    var geom = new THREE.Geometry(),
        mat;

    if(dashed) {
        mat = new THREE.LineDashedMaterial({ linewidth: 3, color: colorHex, dashSize: 3, gapSize: 3 });
    } else {
        mat = new THREE.LineBasicMaterial({ linewidth: 3, color: colorHex });
    }

    geom.vertices.push( src.clone() );
    geom.vertices.push( dst.clone() );
    geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

    var axis = new THREE.Line( geom, mat, THREE.LinePieces );

    return axis;

}


