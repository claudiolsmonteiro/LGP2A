/**
 * Created by João on 11/04/2016.
 */
/**
 * Created by João on 10/03/2016.
 */

controllerModule.controller("panoramaController", function($scope, $stateParams, $state, LocalStorageService){

  ////////////////////
  $scope.models = LocalStorageService.getModelInfo();
  $scope.texts = texts;
  $scope.language = LocalStorageService.getLanguage();
  ////////////////////

  ionic.Platform.ready(function() {
    // will execute when device is ready, or immediately if the device is already ready.
    //console.log(screen);
    if (screen.lockOrientation) {
      screen.lockOrientation('landscape');
    }
  });

  $scope.room = $stateParams.room;
  $scope.prefix = 'panorama';
  $scope.room_title = $scope.models[$stateParams.room].translations[$scope.language].name.toUpperCase();


  //panorama_available -> true if the room as a panoramic picture.
  //if not, the option won't be shown in the bottom navbar
  $scope.panorama_available = false;

  $scope.next_room_available = ($scope.models[$scope.room].next_room != null);
  $scope.next_room_id = $scope.models[$scope.room].next_room;
  $scope.goToNextRoom = function() { $state.go('room' , {room: $scope.models[$scope.room].next_room }, {reload: true, inherit: false, notify: true} ) ; }

  if ($scope.models[$scope.room].photo != null && $scope.models[$scope.room].photo != undefined)
    $scope.panorama_available = true;


  $scope.showPopup = function () { $scope.room_show_more_info_popup($scope.current_room); };
  $scope.hidePopup = function () { $scope.room_hide_more_info_popup($scope.current_room); };
  $scope.toggleSidebar = function () { showSidebar('panorama-sidebar-menu'); };

  ionic.DomUtil.ready(function(){
    $scope.current_room = $stateParams.room;
    $scope.panorama_ready();
    sidebar_ready('panorama-sidebar-menu');
  });


  $scope.panorama_ready = function(){
    $scope.panorama_init($scope.current_room);
  };


  $scope.room_show_more_info_popup = function(room_id){
    jQuery('#'+room_id+'-more-info-modal').show();
    jQuery('#'+room_id+'-more-info-modal-background').show();
  };

  $scope.room_hide_more_info_popup = function(room_id){
    jQuery('#'+room_id+'-more-info-modal').hide();
    jQuery('#'+room_id+'-more-info-modal-background').hide();
  };


  // PANORAMA FUNCTIONS

  $scope.panorama_init = function(room){
    console.log('init panorama');
    console.log($scope.models[room]);
    var type = $scope.models[room].photo.url == null? 'cubemap' : 'equirectangular';
    var equirectangular_path = $scope.models[room].photo.url;
    var cubemap_array = $scope.models[room].photo.url_cube_map;
    var point;
    console.log(type);
    console.log($scope.models[room]);
     console.log("testes dos pontos");
    
    for (point in $scope.models[room].photo.points) {
    console.log( $scope.models[room].photo.points[point]);

      pannellum.viewer('panorama', {
      "type": type,
      "panorama": equirectangular_path,
      "cubeMap": cubemap_array,
      /*"vaov" : 70,
       minPitch: -10,
       maxPitch: 10,*/
      /*maxHfov: 40,
       minHfov: 30,*/
      "autoLoad": true,
      //hotSpotDebug: true,
      "hotSpots": [
        
        {
          "pitch": $scope.models[room].photo.points[point].x,
          "yaw": $scope.models[room].photo.points[point].y,
          "type": "info",
          "text": $scope.hotspotText('janelas', 'Janelas')
        }
      ]
    });
}
     /*
     
    pannellum.viewer('panorama', {
      "type": type,
      "panorama": equirectangular_path,
      "cubeMap": cubemap_array,
      /*"vaov" : 70,
       minPitch: -10,
       maxPitch: 10,*/
      /*maxHfov: 40,
       minHfov: 30,*/
     /* "autoLoad": true,
      //hotSpotDebug: true,
      "hotSpots": [
        
        {
          "pitch": -0.9,
          "yaw": 144.4,
          "type": "info",
          "text": $scope.hotspotText('janelas', 'Janelas')
        }
      ]
    });

pannellum.viewer('panorama', {
      "type": type,
      "panorama": equirectangular_path,
      "cubeMap": cubemap_array,
      /*"vaov" : 70,
       minPitch: -10,
       maxPitch: 10,*/
      /*maxHfov: 40,
       minHfov: 30,*/
     /* "autoLoad": true,
      //hotSpotDebug: true,
      "hotSpots": [
        {
          "pitch": 14.1,
          "yaw": 1.5,
          "type": "info",
          "text": $scope.hotspotText('piano', 'Piano')/*,
         "URL": "https://artbma.org/"*/
    /*    },
        {
          "pitch": -9.4,
          "yaw": 222.6,
          "type": "info",
          "text": $scope.hotspotText('cadeiras', 'Cadeiras')
        }
      ]
    });*/


  };

  $scope.hotspotText = function(hotspot_id, hotspot_title){
    return "<div class=\"hotspot-box\">"+
      "<p>" + hotspot_title + "</p>" +
      "<a id=\"hotspot_" + hotspot_id + "\" title=\""+ hotspot_title +"\" href=\"#\" "+
      " onclick=\"openPopup(\'" + hotspot_id + "\');return false;\">Mais informação</a>" +
      "</div>";
  };


});

function openPopup(element){
  window.alert(element);
};
