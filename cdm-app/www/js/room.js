/**
 * Created by João on 11/04/2016.
 */
/**
 * Created by João on 10/03/2016.
 */
var scene, camera, renderer, controls, mouseVector;
var geometry, material, mesh;
var objsContainer;

var textures = [];
var objects = [];
var room_lights = [];
var current_room = null;

// this variable will store the last clicked object.
// app will ignore other clicks while this is being animated.
var current_animated_object_name = null;

var panorama_initialized = null;

function room_ready(room_name){
    current_room = room_name;
    panorama_initialized = null;
    room_init();
    room_animate();

    room_initialize_more_info_popup();
}


function room_init() {
    textures = [];
    objects = [];
    room_lights = [];
    current_animated_object_name = null;

    scene = new THREE.Scene();

    var ambient = new THREE.AmbientLight( 0x333333 );
    scene.add( ambient );

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
      scene.add(room_lights[i]);
    }

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;

    raycaster = new THREE.Raycaster();
    mouseVector = new THREE.Vector2();

    objsContainer = [];

    //textures
    loadTexture('room_texture', models[current_room].texture_path, textures);

    loadObjModel(models[current_room].name, models[current_room].title, models[current_room].path, [0, -150, 0], 300, objects, null, textures['room_texture'], scene, [20, 0, 0], 0.5);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setClearColor( 0x4FB9D3, 1 );

    renderer.setSize( window.innerWidth, window.innerHeight);

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    //controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
    controls.enableDamping = true;
    controls.dampingFactor = 0.9;
    controls.enableZoom = true;
    controls.minDistance = 700;
    controls.maxDistance = 1500;

    renderer.domElement.setAttribute('id', 'main-canvas');
    document.getElementById('room-canvas-container').appendChild( renderer.domElement );

}

function room_animate() {

    requestAnimationFrame( room_animate );
    renderer.render( scene, camera );
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
    if(panorama_initialized != current_room) {
        panorama_initialized = current_room;
        panorama_init(current_room);
    }
    $('#room-canvas-container').hide();
    $('#model-btn-bottom-navbar').attr('style', '');
    $('#panorama').show();
    $('#panorama-btn-bottom-navbar').attr('style', 'color: white');
}


