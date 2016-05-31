/**
 * Created by João on 11/04/2016.
 */
/**
 * Created by João on 10/03/2016.
 */

controllerModule.controller("materialsController", function($scope, $stateParams, $state, LocalStorageService){

  ////////////////////
  $scope.models = LocalStorageService.getModelInfo();
  $scope.texts = texts;
  $scope.language = LocalStorageService.getLanguage();
  ////////////////////

  $scope.$on('$ionicView.beforeEnter', function(){
    // Any thing you can think of

  });

  $scope.room = $stateParams.room;
  $scope.prefix = 'materials';
  $scope.room_title = $scope.models[$stateParams.room].translations[$scope.language].name.toUpperCase();

  //panorama_available -> true if the room as a panoramic picture.
  //if not, the option won't be shown in the bottom navbar
  $scope.panorama_available = false;
  if ($scope.models[$scope.room].photo != null && $scope.models[$scope.room].photo != undefined)
    $scope.panorama_available = true;

  $scope.next_room_available = ($scope.models[$scope.room].next_room != null);
  $scope.next_room_id = $scope.models[$scope.room].next_room;
  $scope.goToNextRoom = function() { $state.go('room' , {room: $scope.models[$scope.room].next_room }, {reload: true, inherit: false, notify: true} ) ; }

  $scope.showPopup = function () { $scope.show_more_info_popup($scope.environment.current_room); };
  $scope.hidePopup = function () { $scope.hide_more_info_popup($scope.environment.current_room); };
  $scope.toggleSidebar = function () { showSidebar('materials-sidebar-menu'); };

  ionic.DomUtil.ready(function(){
    $scope.environment = construct_tridimensional_environment([0,150,400]);
    $scope.environment.current_room = $stateParams.room;
    $scope.materials_ready();
    sidebar_ready('materials-sidebar-menu');
  });


  $scope.materials_ready = function(){
    $scope.materials_init();
  };

  $scope.increment_textures_loaded = function(){
    //in room there is only one object and one texture
    //so it will always return true.
    return true;
  };

  $scope.materials_init = function() {

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

    //textures
    //loadTexture($scope.environment, $scope.environment.current_room, $scope.models[$scope.environment.current_room].texture_path, $scope.room_increment_textures_loaded, $scope.room_loadObjects, $scope.room_animate);
    for(var i in $scope.models[$scope.room].materials){
      loadDAE($scope.environment, $scope.models[$scope.room].materials[i].path, [0,0,0], 5);
    }

    $scope.environment.renderer.domElement.setAttribute('id', 'main-canvas');

    var canvas_id = 'materials-'+$scope.environment.current_room+'-canvas-container';
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

    //temp call
    $scope.animate();
  };

  $scope.animate = function() {

    $scope.requestAnimationFrameId = requestAnimationFrame( function() {$scope.animate();} );
    $scope.environment.renderer.render( $scope.environment.scene, $scope.environment.camera );
  };

  $scope.loadObjects = function(){
    loadObjModel($scope.environment, $scope.environment.current_room, [0, -25, 0], 100, 0.5, false, null, $scope.models[$scope.environment.current_room], $scope.language);
  };

  $scope.show_more_info_popup = function(room_id){
    jQuery('#materials-'+room_id+'-more-info-modal').show();
    jQuery('#materials-'+room_id+'-more-info-modal-background').show();
  };

  $scope.hide_more_info_popup = function(room_id){
    jQuery('#materials-'+room_id+'-more-info-modal').hide();
    jQuery('#materials-'+room_id+'-more-info-modal-background').hide();
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
    jQuery('#materials-'+$scope.environment.current_room+'-canvas-container').empty();
  });

});