/**
 * Created by João on 11/04/2016.
 */
/**
 * Created by João on 10/03/2016.
 */

controllerModule.controller("panoramaController", function($scope, $stateParams, $state, customLocalStorage, sidebarUtils){

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
    $scope.prefix = 'panorama';
    $scope.room_title = customLocalStorage.models[$stateParams.room].translations[$scope.language].name.toUpperCase().replace(' ', '<br>');
    $scope.room_description = customLocalStorage.models[$stateParams.room].translations[$scope.language].description;
    $scope.sidebar_background = true;
    $scope.menu_highlight = 'casa';

    //panorama_available -> true if the room as a panoramic picture.
    //if not, the option won't be shown in the bottom navbar
    $scope.panorama_available = false;

    $scope.next_room_available = (customLocalStorage.models[$scope.room].next_room != null);
    $scope.next_room_id = customLocalStorage.models[$scope.room].next_room;
    $scope.goToNextRoom = function() { $state.go('room' , {room: customLocalStorage.models[$scope.room].next_room }, {reload: true, inherit: false, notify: true} ) ; }

    if (customLocalStorage.models[$scope.room].photo != null && customLocalStorage.models[$scope.room].photo != undefined)
        $scope.panorama_available = true;


    $scope.showPopup = function () { $scope.room_show_more_info_popup($scope.current_room); };
    $scope.hidePopup = function () { $scope.room_hide_more_info_popup($scope.current_room); };
    $scope.toggleSidebar = function () { sidebarUtils.showSidebar('panorama-sidebar-menu'); };

    ionic.DomUtil.ready(function(){
        $scope.current_room = $stateParams.room;
        $scope.panorama_ready();
        sidebarUtils.sidebar_ready('panorama-sidebar-menu');
    });


    $scope.panorama_ready = function(){
        $scope.panorama_init($scope.current_room);
    };


    $scope.room_show_more_info_popup = function(room_id){
        console.log('tenta mostrar popup');
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
        //console.log(customLocalStorage.models[room]);
        var type = customLocalStorage.models[room].photo.url == null? 'cubemap' : 'equirectangular';
        var equirectangular_path = customLocalStorage.models[room].photo.url;
        var cubemap_array = customLocalStorage.models[room].photo.url_cube_map;
        var point;
        console.log(type);

        //console.log(customLocalStorage.models[room]);
        //console.log("testes dos pontos");
        //<iframe width="560" height="315" src="https://www.youtube.com/embed/Mhp037U6YR8" frameborder="0" allowfullscreen></iframe>

        var hotspots = [];
        for (point in customLocalStorage.models[room].photo.points) {
            //console.log( customLocalStorage.models[room].photo.points[point]);
            //console.log($scope.language);
            hotspots.push({
                "pitch": customLocalStorage.models[room].photo.points[point].x,
                "yaw": customLocalStorage.models[room].photo.points[point].y,
                "type": "info",
                "text": $scope.hotspotText(customLocalStorage.models[room].photo.points[point])
            });
        }

        /*if(customLocalStorage.models[room].photo.video != null){
            hotspots.push({
                "pitch": customLocalStorage.models[room].photo.video.x,
                "yaw": customLocalStorage.models[room].photo.video.y,
                "type": "info",
                "text": $scope.hotspotVideo(customLocalStorage.models[room].photo.video.url)
            });
        }*/

        pannellum.viewer('panorama', {
            "type": type,
            "panorama": equirectangular_path,
            "cubeMap": cubemap_array,
            "showFullscreenCtrl": false,
            "showZoomCtrl" : false,
            "autoLoad": true,
            hotSpotDebug: true,
            "hotSpots": hotspots
        });

        pannellum.viewer('panorama', {
            "type": type,
            "panorama": equirectangular_path,
            "cubeMap": cubemap_array,
            "showFullscreenCtrl": false,
            "showZoomCtrl" : false,
            "autoLoad": true,
            hotSpotDebug: true,
            "hotSpots": [{
                "pitch": customLocalStorage.models[room].photo.video.x,
                "yaw": customLocalStorage.models[room].photo.video.y,
                "type": "info",
                "text": $scope.hotspotVideo(customLocalStorage.models[room].photo.video.url)
            }]
        });
    };
/*
    $scope.hotspotText = function(hotspot){
        console.log(hotspot);
        return "<div class=\"hotspot-box\">"+
            "<p>" + hotspot.translations[$scope.language].title + "</p>" +
            "<a id=\"hotspot_" + hotspot.id + "\" href=\"#\" "+
            " onclick=\"openPopup(\'" + hotspot.translations[$scope.language].description + "\');return false;\">Mais informação</a>" +
            "</div>";
    }; */

    $scope.hotspotText = function(hotspot){
      console.log(hotspot);
      return "<div class=\"hotspot-box\">"+
         "<p id=\"hotspot_title\">" + hotspot.translations[$scope.language].title + "</p>" +
     	 "<p>" + hotspot.translations[$scope.language].description +"</p>" + "</div>";
    };

    $scope.hotspotVideo = function(hotspot_url){
        return "<div class=\"hotspot-box\">"+
      			"<iframe src=" +hotspot_url +"  width=\"560\" height=\"315\" allowfullscreen=\"true\">"+"</iframe>"+
         		"</div>" ;
    };

    $scope.validURL = function (str) {
        var pattern = new RegExp('^(https?:\/\/)?'+ // protocol
            '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'+ // domain name
            '((\d{1,3}\.){3}\d{1,3}))'+ // OR ip (v4) address
            '(\:\d+)?(\/[-a-z\d%_.~+]*)*'+ // port and path
            '(\?[;&a-z\d%_.~+=-]*)?'+ // query string
            '(\#[-a-z\d_]*)?$','i'); // fragment locater
        if(!pattern.test(str)) {
            return false;
        } else {
            return true;
        }
    };

});

function openPopup(element){
    window.alert(element);
};
