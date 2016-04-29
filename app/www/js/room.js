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

// this variable will store the last clicked object.
// app will ignore other clicks while this is being animated.
var current_animated_object_name = null;

function room_ready(){
    room_init();
    room_animate();


    $('#room-more-info-popup').click( function(e) {
        $('#room-more-info-modal').show();
        $('#room-more-info-modal-background').show();
    });
    var modal = document.getElementById('room-more-info-modal');
    window.onclick = function(event) {
        if (event.target == modal) {
            $('#room-more-info-modal').hide();
            $('#room-more-info-modal-background').hide();
        }
    }

}


function room_init() {
    textures = [];
    objects = [];
    current_animated_object_name = null;

    scene = new THREE.Scene();

    var ambient = new THREE.AmbientLight( 0xAAAAAA );
    scene.add( ambient );

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;

    raycaster = new THREE.Raycaster();
    mouseVector = new THREE.Vector2();

    objsContainer = [];

    //textures
    loadTexture('sample', 'obj/texture.jpg', textures);

    // models
    loadObjModel('teapot', 'obj/teapot.obj', [-200, 50, 0], 30, objects, pickable_objects, textures['sample'], scene, null, null);
    loadObjModel('person', 'obj/male02.obj', [100, -150, 0], 3.5, objects, pickable_objects, textures['sample'], scene, null, null);

    //addSampleCubeToScene('cube1', [-230, -600, 0], 200, objects, pickable_objects, textures['sample'], scene, null, null);
    //addSampleCubeToScene('cube2', [0, -600, 0], 200, objects, pickable_objects, textures['sample'], scene, null, null);
    //addSampleCubeToScene('cube3', [230, -600, 0], 200, objects, pickable_objects, textures['sample'], scene, null, null);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0x4FB9D3, 1 );
    /*var rendererHeight, rendererWidth;
    rendererWidth = document.getElementById('model-canvas-container').offsetWidth;
    if(window.innerWidth > window.innerHeight){
        rendererHeight = window.innerHeight*0.9;
    }
    else rendererHeight = rendererWidth*1.2

    console.log("renderer heigh: " + rendererHeight + " # width: " + rendererWidth);*/

    //renderer.setSize( window.innerWidth * 0.6, window.innerHeight *0.6 );
    //renderer.setSize( rendererWidth, rendererHeight );
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




