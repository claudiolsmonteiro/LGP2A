/**
 * Created by João on 10/03/2016.
 */

controllerModule.controller("tridimensionalModelController", function($scope, $rootScope, $stateParams, $ionicPopover, $cordovaBeacon, $state){

    $scope.beacons = {};

    // set to either landscape
    $scope.prefix = 'model';

    $scope.beacons_detected = [];
    for(var key in models){
        var temp_key = models[key].beacon_uuid+':'+models[key].beacon_major+':'+models[key].beacon_minor;
        $scope.beacons_detected[temp_key] = {};
        $scope.beacons_detected[temp_key].detected = false; //will determine if the user has already been prompted for this beacon
        $scope.beacons_detected[temp_key].model_key = key;
    }

    ionic.Platform.ready(function(){
        // will execute when device is ready, or immediately if the device is already ready.
        //console.log(screen);
        if(screen.lockOrientation) {
            //screen.lockOrientation('landscape');
        }
        //console.log(screen.orientation);

        /*window.addEventListener("orientationchange", function() {
         console.log(window.orientation);
         tridimensional_model_ready();
         }, false);*/

        // BEACONS
        $cordovaBeacon.requestWhenInUseAuthorization();
        $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult) {
            var uniqueBeaconKey;
            for(var i = 0; i < pluginResult.beacons.length; i++) {
                uniqueBeaconKey = pluginResult.beacons[i].uuid + ":" + pluginResult.beacons[i].major + ":" + pluginResult.beacons[i].minor;
                //$scope.beacons[uniqueBeaconKey] = pluginResult.beacons[i];
                if(pluginResult.beacons[i].accuracy < 3.0 && $scope.beacons_detected[uniqueBeaconKey].detected === false){
                    $scope.beacons_detected[uniqueBeaconKey].detected = true;
                    var prompt_result =
                        window.confirm('Está perto de:\n' +
                            models[$scope.beacons_detected[uniqueBeaconKey].model_key].title + '\n' +
                            'Deseja ver mais informação?');
                    if(prompt_result){ //navigate to detected room
                        $state.go('room' , {room: $scope.beacons_detected[uniqueBeaconKey].model_key }, {reload: true, inherit: false, notify: true} ) ;
                    }
                }
            }
            //$scope.$apply();
            //console.log($scope.beacons);
        });
        for(var key in models){
            if (models[key].beacon_uuid != null && models[key].beacon_uuid != undefined) {
                $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion(
                    "beacon-" + models[key].name,
                    models[key].beacon_uuid));
            }
        }



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
    $scope.animateRoom = function ( room_id ) { $scope.animateObjectAux(room_id , $scope.environment); $scope.closePopover(); };
    ionic.DomUtil.ready(function(){
        //overlay_elements_ready();
        //console.log($stateParams.current_room);
        $scope.environment = construct_tridimensional_environment([0,200,400]);
        $scope.environment.current_room = $stateParams.current_room;
        $scope.tridimensional_model_ready($scope.environment);
        sidebar_ready('model-sidebar-menu');

    });


    // FUNCTIONS

    $scope.tridimensional_model_ready = function(environment){
        $scope.tridimensional_model_init(environment);
        //tridimensional_model_animate();
    }

    $scope.model_increment_textures_loaded = function(environment){
        environment.textures_loaded++;
        return Object.size(models) == environment.textures_loaded;
    }

    $scope.tridimensional_model_init = function(environment) {

        document.addEventListener( 'mousedown', function( e ) { $scope.onDocumentMouseDown( e, environment );}, true );

        var ambient = new THREE.AmbientLight( 0x333333 );
        environment.scene.add( ambient );

        /*var directionalLight = new THREE.DirectionalLight( 0xffeedd );
         directionalLight.position.set( 0, 0, 1 ).normalize();
         scene.add( directionalLight );

         var directionalLight2 = new THREE.DirectionalLight( 0xffeedd );
         directionalLight2.position.set( 0, 0, 1 ).normalize();
         scene.add( directionalLight2 );*/

        var pointLight = new THREE.PointLight( 0xeeeeee, 1.7, 1000 );
        pointLight.position.set( 500, 200, 500 );
        environment.lights.push(pointLight);

        var pointLight2 = new THREE.PointLight( 0xeeeeee, 1.7, 1000 );
        pointLight2.position.set( -500, 200, 500 );
        environment.lights.push(pointLight2);

        var pointLight3 = new THREE.PointLight( 0xeeeeee, 1, 1000 );
        pointLight3.position.set( 0, 700, 0 );
        environment.lights.push(pointLight3);

        var pointLight4 = new THREE.PointLight( 0xeeeeee, 1.7, 1000 );
        pointLight4.position.set( -500, 200, -500 );
        environment.lights.push(pointLight4);

        var pointLight5 = new THREE.PointLight( 0xeeeeee, 1.7, 1000 );
        pointLight5.position.set( 500, 200, -500 );
        environment.lights.push(pointLight5);

        for (var i in environment.lights){
            environment.scene.add(environment.lights[i]);
        }

        //textures
        for(var key in models){
            loadTexture(environment, key, $scope.model_increment_textures_loaded, $scope.model_loadObjects, $scope.tridimensional_model_animate);
        }

        environment.renderer.domElement.setAttribute('id', 'model-main-canvas');
        document.getElementById('model-canvas-container').html = '';
        document.getElementById('model-canvas-container').appendChild( environment.renderer.domElement );
        window.addEventListener("orientationchange", function(){
            //console.log(screen.orientation); // e.g. portrait
            environment.camera.aspect = window.screen.width / window.screen.height;
            environment.camera.updateProjectionMatrix();
            environment.renderer.setSize( window.screen.width, window.screen.height);
        });

        var axes = buildAxes( 1000 );
        environment.scene.add(axes);

    }

    $scope.tridimensional_model_animate = function(environment) {
        /*console.log('#########################################');
         console.log('textures loaded: ' + model_textures_loaded);
         console.log('models size: ' +  Object.size(models));
         console.log(model_objects_loaded? 'objects started loading ' : 'objects didn\'t start loading');
         console.log(model_textures);
         console.log('#########################################');
         */
        requestAnimationFrame( function(){$scope.tridimensional_model_animate(environment)} );

        var temp_millis = (new Date()).getTime();
        if(temp_millis - environment.last_animation > 20){
            environment.last_animation = temp_millis;
            for(var key in environment.objects){
                $scope.animateObject(environment.objects[key]);
            }
        }
        environment.renderer.render( environment.scene, environment.camera );

    }

    $scope.model_loadObjects = function(environment){
        var y_coord = 100;
        for(var key in models){
            var active = false;
            if(environment.current_room != null && environment.current_room == key)
                active = true;
            loadObjModel(environment, key, [0, y_coord, 0], 100, 0.5, active, $scope.objCallback);
        }
    }

    $scope.onDocumentMouseDown = function( event , environment ) {
        if(event.target.getAttribute('id') == 'model-main-canvas'){

            environment.mouseVector.x = ( event.clientX / environment.renderer.domElement.clientWidth ) * 2 - 1;
            environment.mouseVector.y = - ( event.clientY / environment.renderer.domElement.clientHeight ) * 2 + 1;

            environment.raycaster = new THREE.Raycaster();
            environment.raycaster.setFromCamera( environment.mouseVector.clone(), environment.camera );
            var intersects = environment.raycaster.intersectObjects( environment.pickable_objects, true );

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
    }

    $scope.animateObjectAux = function(room_id, environment){
        environment.objects[room_id].mesh.callback();
    }

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

    }

    $scope.showObjectInfoOverlayMenus = function(objectName, objectTitle){
        jQuery('#top-info-bar').html(objectTitle.toUpperCase());

        jQuery('#top-info-bar').attr('data-current-object', objectName);
        jQuery('#room_link').attr('href', '#/room/'+objectName);
        jQuery('#top-info-bar').slideDown();
        jQuery('#bottom-navbar').slideDown();
    }

    $scope.hideObjectInfoOverlayMenus = function(objectName, objectTitle){

        if (jQuery('#top-info-bar').attr('data-current-object') == objectName){
            jQuery('#top-info-bar').slideUp();
            jQuery('#bottom-navbar').slideUp();
        }
    }

    $scope.objCallback = function(model_id, object, environment){
        //console.log(object);
        if(object.animation == null)
            return;

        //if current animated object's animation is still in progress, ignore (return immediately).
        if(environment.current_animated_object_name != null &&
            ( environment.objects[environment.current_animated_object_name].animation_state == 1
            || environment.objects[environment.current_animated_object_name].animation_state == 3) ) {
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
            $scope.objectsBackToOriginalPositionExcept(object, environment);
            environment.current_animated_object_name = object.name;
        }
        else if (object.animation_state == 3){ //if positioning this object in its original position, immediately hide all menus
            $scope.hideObjectInfoOverlayMenus(object.name);
        }
        //console.log('new animation state: ' + object.animation_state);
    }

    $scope.objectsBackToOriginalPositionExcept = function (object, environment) {
        for(var key in environment.objects){
            if(key != object.name){
                if(environment.objects[key].animation_state == 2){
                    environment.objects[key].current_animation_start_time = (new Date()).getTime();
                    environment.objects[key].animation_state++;
                    $scope.hideObjectInfoOverlayMenus(environment.objects[key].name);
                }
                else if(environment.objects[key].animation_state == 1){
                    environment.objects[key].pendent_animations++;
                }
            }
        }
    }
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
