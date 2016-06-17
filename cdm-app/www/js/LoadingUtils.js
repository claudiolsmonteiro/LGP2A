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
function loadObjModel(environment, object_key, position, scale, animation_span, active, callback_function, model, language) {
    var loader = new THREE.OBJLoader( manager );
    var temp_mesh = null;
    loader.load( model.model_path, function ( object ) {
        object.traverse(function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                //console.log(texture);
                child.material.map = environment.textures[object_key];
                if(object_key != 'casa'){
                    child.callback = function() {
                        callback_function(object_key, object, environment);
                    };
                }
                if(environment.pickable_objects != null)
                    environment.pickable_objects.push(child);
                object.mesh = child;
                temp_mesh = child;
            }
        });
        object.name = object_key;
        object.title = model.translations[language].name;
        object.original_position = position;
        object.position.x = position[0];
        object.position.y = position[1];
        object.position.z = position[2];
        object.scale.set(scale, scale, scale);
        object.animation_state = 0; //0 - initial_stopped, 1 - during initial, 2 - final stopped, 3 - during final
        object.current_animation_start_time = 0;
        object.animation = model.animation.length > 0 ? model.animation : null;
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


//  obj mtl loading tests
function loadObjMtl(environment, object_key, position, scale, animation_span, active, callback_function, models){
  var mtlLoader = new THREE.MTLLoader();
  var material_path_parts = models[object_key].material_path.split('/');
  var object_path_parts = models[object_key].path.split('/');
  var directory = '';
  for(var i = 0; i < material_path_parts.length - 1; i++){
    directory = directory + material_path_parts[i] + '/';
  }
  mtlLoader.setBaseUrl( directory);
  mtlLoader.setPath( directory);
  mtlLoader.load( material_path_parts[material_path_parts.length - 1], function( materials ) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    console.log(materials.materials);
    objLoader.setMaterials( materials );
    objLoader.setPath( directory );
    objLoader.load( object_path_parts[object_path_parts.length - 1], function ( object ) {
      console.log(object);
      object.traverse( function ( child ) {
        console.log(child);
        //iterate over materials array to find if there is any material used in this child

        if ( child instanceof THREE.Mesh ) {
          //child.material.ambient.setHex(0xFF0000);
          console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
          console.log('child name: ' + child.name);
          console.log(child);
          for(var i in materials.materials){
            console.log('   material name: ' + materials.materials[i].name);
            console.log(materials.materials[i]);

            if(child.name.contains(i)) {
              console.log('vai aplicar cor');
              console.log('cor velha:');
              console.log(child.material.color);
              console.log('cor nova:');
              console.log(materials.materials[i].color);
              child.material.color = materials.materials[i].color;
            }
            console.log('######################');
          }
        }
      } );

      object.name = object_key;
      object.title = models[object_key].title;
      object.original_position = position;
      object.position.x = 200;
      object.position.y = -100;
      object.position.z = -200;
      object.scale.set(scale, scale, scale);
      object.animation_state = 0; //0 - initial_stopped, 1 - during initial, 2 - final stopped, 3 - during final
      object.current_animation_start_time = 0;
      object.animation = models[object_key].animation;
      object.animation_span = animation_span;
      object.pendent_animations = 0;

      environment.objects[object_key] = object;
      environment.scene.add(object);

    }, onProgress, onError );

  });

}

//load colada (.dae) files
function loadDAE(environment, model_path, position, scale){
  // instantiate a loader
  var loader = new THREE.ColladaLoader();

  loader.load(
    // resource URL
    model_path,
    // Function when resource is loaded
    function ( collada ) {
      console.log(collada);
      collada.scene.children[0].scale.set(scale, scale, scale);
      /*for (var i in collada.scene.children[0].children[0].material.materials){
        collada.scene.children[0].children[0].material.materials[i].transparent = true;
        collada.scene.children[0].children[0].material.materials[i].opacity = 0.6;
      }*/
      //collada.scene.children[0].children[0].rotation.x = 90 * Math.PI / 180;
      //collada.scene.children[0].children[0].rotation.x = x * Math.PI / 180;
      //collada.scene.children[0].children[0].rotation.z = 90 * Math.PI / 180;
      environment.scene.add( collada.scene );
    },
    // Function called when download progresses
    function ( xhr ) {
      console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    }
  );
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

    object.renderer.setClearColor( 0x009ABE, 1 );

    return object;
}
