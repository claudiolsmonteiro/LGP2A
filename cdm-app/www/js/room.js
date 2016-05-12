/**
 * Created by João on 11/04/2016.
 */
/**
 * Created by João on 10/03/2016.
 */
var room_scene, room_camera, room_renderer, room_controls;

var room_textures = [];
var room_objects = [];
var room_lights = [];
var room_current_room = null;
var room_textures_loaded = 0;//number of textures loaded.
var room_panorama_initialized = null;

function room_ready(room_name){
    room_current_room = room_name;
    room_panorama_initialized = null;
    room_init();
    //room_animate();
    room_initialize_more_info_popup();
}

function room_increment_textures_loaded(){
    //in room there is only one object and one texture
    //so it will always return true.
    return true;
}

function room_init() {
    room_textures = [];
    room_objects = [];
    room_lights = [];
    room_textures_loaded = 0;

    room_scene = new THREE.Scene();

    var ambient = new THREE.AmbientLight( 0x333333 );
    room_scene.add( ambient );

    var pointLight = new THREE.PointLight( 0xeeeeee, 1.4, 1000 );
    pointLight.position.set( 500, 200, 500 );
    room_lights.push(pointLight);

    pointLight = new THREE.PointLight( 0xeeeeee, 1.4, 1000 );
    pointLight.position.set( -500, 200, 500 );
    room_lights.push(pointLight);

    pointLight = new THREE.PointLight( 0xeeeeee, 1, 1000 );
    pointLight.position.set( 0, 700, 0 );
    room_lights.push(pointLight);

    pointLight = new THREE.PointLight( 0xeeeeee, 1, 1000 );
    pointLight.position.set( 0, -500, 0 );
    room_lights.push(pointLight);

    pointLight = new THREE.PointLight( 0xeeeeee, 1.4, 1000 );
    pointLight.position.set( -500, 200, -500 );
    room_lights.push(pointLight);

    pointLight = new THREE.PointLight( 0xeeeeee, 1.4, 1000 );
    pointLight.position.set( 500, 200, -500 );
    room_lights.push(pointLight);

    for (var i in room_lights){
        room_scene.add(room_lights[i]);
    }

    room_camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    room_camera.position.z = 1000;

    //room_raycaster = new THREE.Raycaster();
    //room_mouseVector = new THREE.Vector2();

    room_objsContainer = [];

    //textures
    loadTexture('room_texture', models[room_current_room].texture_path, room_textures, room_increment_textures_loaded, room_loadObjects, room_animate);


    room_renderer = new THREE.WebGLRenderer();
    room_renderer.setPixelRatio( window.devicePixelRatio );
    room_renderer.setClearColor( 0x4FB9D3, 1 );

    room_renderer.setSize( window.innerWidth, window.innerHeight);

    room_controls = new THREE.OrbitControls( room_camera, room_renderer.domElement );
    //controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
    room_controls.enableDamping = true;
    room_controls.dampingFactor = 0.9;
    room_controls.enableZoom = true;
    room_controls.minDistance = 700;
    room_controls.maxDistance = 1500;

    room_renderer.domElement.setAttribute('id', 'main-canvas');
    document.getElementById('room-canvas-container').appendChild( room_renderer.domElement );

    window.addEventListener("orientationchange", function(){
        //console.log(screen.orientation); // e.g. portrait

        room_camera.aspect = window.screen.width / window.screen.height;
        room_camera.updateProjectionMatrix();

        room_renderer.setSize( window.screen.width, window.screen.height);
    });
}

function room_animate() {

    requestAnimationFrame( room_animate );
    room_renderer.render( room_scene, room_camera );
}

function room_loadObjects(){
    loadObjModel(models[room_current_room].name, models[room_current_room].title, models[room_current_room].path, [0, -150, 0], 300, room_objects, null, room_textures['room_texture'], room_scene, null, 0.5);
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

function showRoomPanorama(){
    if(room_panorama_initialized != room_current_room) {
        room_panorama_initialized = room_current_room;
        panorama_init(room_current_room);
    }
    $('#room-canvas-container').hide();
    $('#model-btn-bottom-navbar').attr('style', '');
    $('#panorama').show();
    $('#panorama-btn-bottom-navbar').attr('style', 'color: white');
}


