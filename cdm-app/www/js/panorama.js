/**
 * Created by João on 01/05/2016.
 */

function panorama_init(room){


    pannellum.viewer('panorama', {
        /*"type": "equirectangular",
        "panorama": "img/sculpteur.jpg",*/
        "type": "cubemap",
        "cubeMap": models[room].panorama_paths,
        /*"vaov" : 70,
        minPitch: -10,
        maxPitch: 10,*/
        /*maxHfov: 40,
        minHfov: 30,*/
        "autoLoad": true,
        hotSpotDebug: true,
        "hotSpots": [
            {
                "pitch": 14.1,
                "yaw": 1.5,
                "type": "info",
                "text": hotspotText('piano', 'Piano')/*,
                "URL": "https://artbma.org/"*/
            },
            {
                "pitch": -9.4,
                "yaw": 222.6,
                "type": "info",
                "text": hotspotText('cadeiras', 'Cadeiras')
            },
            {
                "pitch": -0.9,
                "yaw": 144.4,
                "type": "info",
                "text": hotspotText('janelas', 'Janelas')
            }
        ]
    });
}

function openPopup(element){
    window.alert(element);
}

function hotspotText(hotspot_id, hotspot_title){
  return "<div class=\"hotspot-box\">"+
    "<p>" + hotspot_title + "</p>" +
    "<a id=\"hotspot_" + hotspot_id + "\" title=\""+ hotspot_title +"\" href=\"#\" "+
    " onclick=\"openPopup(\'" + hotspot_id + "\');return false;\">Mais informação</a>" +
    "</div>";
}
