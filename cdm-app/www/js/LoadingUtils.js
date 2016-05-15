/**
 * Created by João on 08/03/2016.
 */

var manager = new THREE.LoadingManager();
manager.onProgress = function ( item, loaded, total ) {
    console.log( item, loaded, total );
};

/**
 *
 * @param object_key key of the array to which the model shall be added when loaded.
 * @param position [x,y,z]
 * @param scale scale (same in all three axes)
 * @param active - if this is the current room, active will be true, and callback function will be called.
 */
//function loadObjModel(model_id, title, model_path, position, scale, objectsArray, meshesArray, texture, scene, animation, animation_span, active) {
function loadObjModel(environment, object_key, position, scale, animation_span, active, callback_function, models) {
    var loader = new THREE.OBJLoader( manager );
    var temp_mesh = null;
    loader.load( models[object_key].path, function ( object ) {
        object.traverse(function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                //console.log(texture);
                child.material.map = environment.textures[object_key];
                child.callback = function() {
                    callback_function(object_key, object, environment);
                }
                if(environment.pickable_objects != null)
                    environment.pickable_objects.push(child);
                object.mesh = child;
                temp_mesh = child;
            }
        });
        object.name = object_key;
        object.title = models[object_key].title;
        object.original_position = position;
        object.position.x = position[0];
        object.position.y = position[1];
        object.position.z = position[2];
        object.scale.set(scale, scale, scale);
        object.animation_state = 0; //0 - initial_stopped, 1 - during initial, 2 - final stopped, 3 - during final
        object.current_animation_start_time = 0;
        object.animation = models[object_key].animation;
        object.animation_span = animation_span;
        object.pendent_animations = 0;

        environment.objects[object_key] = object;
        environment.scene.add(object);
        if(active) {
            //console.log('going to call callback. whooohoo ' + model_id);
            temp_mesh.callback();
        }
    }, onProgress, onError );
}


//function loadTexture(texture_id, texture_path, texturesArray, function_increment_textures_loaded, function_load_objects, function_animate){
function loadTexture(environment, texture_id, texture_path, function_increment_textures_loaded, function_load_objects, function_animate){
    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader( manager );
    loader.load( texture_path, function ( image ) {
        texture.image = image;
        texture.needsUpdate = true;
        if (function_increment_textures_loaded(environment)) {
            function_load_objects(environment);
            function_animate(environment);
        }
    });
    environment.textures[texture_id] = texture;
    return texture;
}


var onProgress = function ( xhr ) {
    if ( xhr.lengthComputable ) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log( Math.round(percentComplete, 2) + '% downloaded' );
    }
};

var onError = function ( xhr ) {

};

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function construct_tridimensional_environment(camera_vec){
    var object = {};
    object.textures = [];
    object.objects = [];
    object.lights = [];
    object.pickable_objects = [];
    object.current_animated_object_name = null; // this variable will store the last clicked object. app will ignore other clicks while this is being animated.
    object.last_animation = (new Date()).getTime(); // time stamp used to calculate animation evolution
    object.textures_loaded = 0; // number of textures loaded.
    object.raycaster = new THREE.Raycaster();
    object.mouseVector = new THREE.Vector2();
    object.objsContainer = [];

    object.scene = new THREE.Scene();

    object.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    //object.camera = new THREE.PerspectiveCamera( 75, window.screen.width / window.screen.height, 1, 10000 );
    object.camera.position.x = camera_vec[0];
    object.camera.position.y = camera_vec[1];
    object.camera.position.z = camera_vec[2];
    object.camera.updateProjectionMatrix();

    object.renderer = new THREE.WebGLRenderer();
    object.renderer.setPixelRatio( window.devicePixelRatio );
    object.renderer.setSize(window.innerWidth, window.innerHeight);

    object.controls = new THREE.OrbitControls( object.camera, object.renderer.domElement );
    object.controls.enableDamping = true;
    object.controls.dampingFactor = 0.9;
    object.controls.enableZoom = true;
    object.controls.minDistance = 200;
    object.controls.maxDistance = 1000;

    object.renderer.setClearColor( 0x4FB9D3, 1 );

    return object;
}