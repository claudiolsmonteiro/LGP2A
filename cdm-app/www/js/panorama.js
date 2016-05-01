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
        "hotSpots": [
            {
                "pitch": 14.1,
                "yaw": 1.5,
                "type": "info",
                "text": "Baltimore Museum of Art",
                "URL": "https://artbma.org/"
            },
            {
                "pitch": -9.4,
                "yaw": 222.6,
                "type": "info",
                "text": "Art Museum Drive"
            },
            {
                "pitch": -0.9,
                "yaw": 144.4,
                "type": "info",
                "text": "North Charles Street"
            }
        ]
    });
}