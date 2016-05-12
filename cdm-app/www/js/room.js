/**
 * Created by João on 11/04/2016.
 */
/**
 * Created by João on 10/03/2016.
 */

var room_panorama_initialized = null;

function room_ready(environment){
    room_panorama_initialized = null;
    room_init(environment);
    //room_animate();
    room_initialize_more_info_popup();
}

function room_increment_textures_loaded(){
    //in room there is only one object and one texture
    //so it will always return true.
    return true;
}

function room_init(environment) {

    var ambient = new THREE.AmbientLight( 0x333333 );
    environment.scene.add( ambient );

    var pointLight = new THREE.PointLight( 0xeeeeee, 1.4, 1000 );
    pointLight.position.set( 500, 200, 500 );
    environment.lights.push(pointLight);

    pointLight = new THREE.PointLight( 0xeeeeee, 1.4, 1000 );
    pointLight.position.set( -500, 200, 500 );
    environment.lights.push(pointLight);

    pointLight = new THREE.PointLight( 0xeeeeee, 1, 1000 );
    pointLight.position.set( 0, 700, 0 );
    environment.lights.push(pointLight);

    pointLight = new THREE.PointLight( 0xeeeeee, 1, 1000 );
    pointLight.position.set( 0, -500, 0 );
    environment.lights.push(pointLight);

    pointLight = new THREE.PointLight( 0xeeeeee, 1.4, 1000 );
    pointLight.position.set( -500, 200, -500 );
    environment.lights.push(pointLight);

    pointLight = new THREE.PointLight( 0xeeeeee, 1.4, 1000 );
    pointLight.position.set( 500, 200, -500 );
    environment.lights.push(pointLight);

    for (var i in environment.lights){
        environment.scene.add(environment.lights[i]);
    }

    //textures
    loadTexture(environment, environment.current_room, room_increment_textures_loaded, room_loadObjects, room_animate);

    environment.renderer.domElement.setAttribute('id', 'main-canvas');
    document.getElementById('room-canvas-container').appendChild( environment.renderer.domElement );

    window.addEventListener("orientationchange", function(){
        //console.log(screen.orientation); // e.g. portrait
        environment.camera.aspect = window.screen.width / window.screen.height;
        environment.camera.updateProjectionMatrix();
        environment.renderer.setSize( window.screen.width, window.screen.height);
    });

    var axes = buildAxes( 1000 );
    environment.scene.add(axes);
}

function room_animate(environment) {

    requestAnimationFrame( function() {room_animate(environment);} );
    environment.renderer.render( environment.scene, environment.camera );
}

function room_loadObjects(environment){
    loadObjModel(environment, environment.current_room, [0, -25, 0], 100, 0.5);
}

function room_initialize_more_info_popup(){
    console.log('initialize popup');
    $('#room-more-info-popup').click( function(e) {
        console.log('click  no botao');
        $('#room-more-info-modal').show();
        $('#room-more-info-modal-background').show();
    });

    $('#room-more-info-modal .close-btn').on('click', function(){
        $('#room-more-info-modal').hide();
        $('#room-more-info-modal-background').hide();
    });
}

function showRoomModel(){
    $('#panorama').hide();
    $('#panorama-btn-bottom-navbar').attr('style', '');
    $('#room-canvas-container').show();
    $('#model-btn-bottom-navbar').attr('style', 'color: white');
}

function showRoomPanorama(environment){
    if(room_panorama_initialized != environment.current_room) {
        room_panorama_initialized = environment.current_room;
        panorama_init(environment.current_room);
    }
    $('#room-canvas-container').hide();
    $('#model-btn-bottom-navbar').attr('style', '');
    $('#panorama').show();
    $('#panorama-btn-bottom-navbar').attr('style', 'color: white');
}


