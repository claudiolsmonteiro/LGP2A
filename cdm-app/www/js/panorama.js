/**
 * Created by João on 01/05/2016.
 */


function panorama_init(){
    /*("img.advancedpanorama").panorama({
        auto_start: 0,
        start_position: 1527,
        viewport_width: window.innerWidth
    });
    $('.thickbox').fancybox();*/
    pannellum.viewer('panorama', {
        "type": "equirectangular",
        "panorama": "img/sculpteur.jpg",
        "vaov" : 70,
        minPitch: -10,
        maxPitch: 10,
        maxHfov: 40,
        minHfov: 30,
        "autoLoad": true,
        hotSpotDebug: true,
        "hotSpots": [
            {
                "pitch": 14.1,
                "yaw": 1.5,
                "type": "info",
                "text": '<a id="hotspot1" title="Click to do something" href="#" onclick="openPopup();return false;">link text</a>'/*,
                "URL": "https://artbma.org/"*/
            },
            {
                "pitch": -9.4,
                "yaw": 222.6,
                "type": "info",
                "text": '<a id="hotspot2" title="Click to do something" href="#" onclick="openPopup();return false;">link text</a>'
            },
            {
                "pitch": -0.9,
                "yaw": 144.4,
                "type": "info",
                "text": '<a id="hotspot3" title="Click to do something" href="#" onclick="openPopup();return false;">link text</a>'
            }
        ]
    });
}

function openPopup(element){
    window.alert('teste');
}