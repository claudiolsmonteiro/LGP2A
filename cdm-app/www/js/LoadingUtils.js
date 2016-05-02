/**
 * Created by João on 08/03/2016.
 */

var manager = new THREE.LoadingManager();
manager.onProgress = function ( item, loaded, total ) {
    console.log( item, loaded, total );
};

/**
 *
 * @param model_id key of the array to which the model shall be added when loaded.
 * @param model_path path to the .obj file
 * @param position [x,y,z]
 * @param scale scale (same in all three axes)
 * @param objectsArray associative array to which the model shall be added when loaded. Key will be @model_id
 * @param active - if this is the current room, active will be true, and callback function will be called.
 */
function loadObjModel(model_id, title, model_path, position, scale, objectsArray, meshesArray, texture, scene, animation, animation_span, active) {
    var loader = new THREE.OBJLoader( manager );
    var temp_mesh = null;
    loader.load( model_path, function ( object ) {
        object.traverse(function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.material.map = texture;
                child.callback = function() {
                    objCallback(model_id, object, scene);
                }
                if(meshesArray != null)
                    meshesArray.push(child);
                object.mesh = child;
                temp_mesh = child;
            }
        });
        object.name = model_id;
        object.title = title;
        object.original_position = position;
        object.position.x = position[0];
        object.position.y = position[1];
        object.position.z = position[2];
        object.scale.set(scale, scale, scale);
        object.animation_state = 0; //0 - initial_stopped, 1 - during initial, 2 - final stopped, 3 - during final
        object.current_animation_start_time = 0;
        object.animation = animation;
        object.animation_span = animation_span;
        object.pendent_animations = 0;

        objectsArray[model_id] = object;
        scene.add(object);
        if(active) {
            console.log('going to call callback. whooohoo ' + model_id);
            temp_mesh.callback();
        }
    }, onProgress, onError );
}


//  obj mtl loading tests
function loadObjMtl(scene){
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setBaseUrl( 'obj/casa_da_musica_salas_separadas/' );
    mtlLoader.setPath( 'obj/casa_da_musica_salas_separadas/' );
    mtlLoader.load( 'casa_da_musica.mtl', function( materials ) {

        materials.preload();

        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.setPath( 'obj/casa_da_musica_salas_separadas/' );
        objLoader.load( 'luis1.obj', function ( object ) {

            //object.position.y = - 95;
            object.scale.set(150, 150, 150);
            scene.add( object );

        }, onProgress, onError );

    });

}

function addSampleCubeToScene(model_id, position, size, objectsArray, meshesArray, texture, scene, animation, animation_span){
    var object = new THREE.Mesh( new THREE.CubeGeometry( size, size, size ), new THREE.MeshNormalMaterial() );
    meshesArray.push(object);
    object.mesh = object;
    object.name = model_id;
    object.original_position = position;
    object.position.x = position[0];
    object.position.y = position[1];
    object.position.z = position[2];
    //object.scale.set(scale, scale, scale);
    object.animation_state = 0; //0 - initial_stopped, 1 - during initial, 2 - final stopped, 3 - during final
    object.current_animation_start_time = 0;
    object.animation = animation;
    object.animation_span = animation_span;
    object.pendent_animations = 0;
    object.callback = function() {
        objCallback(model_id, object, scene);
    }
    objectsArray[model_id] = object;
    scene.add(object);

}

function loadTexture(texture_id, texture_path, texturesArray){
    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader( manager );
    loader.load( texture_path, function ( image ) {
        texture.image = image;
        texture.needsUpdate = true;
    } );
    texturesArray[texture_id] = texture;
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

function objCallback(model_id, object, scene){
    if(object.animation == null)
        return;

    //if current animated object's animation is still in progress, ignore (return immediately).
    if(current_animated_object_name != null && ( objects[current_animated_object_name].animation_state == 1 || objects[current_animated_object_name].animation_state == 3) ) {
        console.log('ignoring click. other object being animated');
        return;
    }

    console.log( model_id );
    if(object.animation_state == 1 || object.animation_state == 3){
        console.log('ignoring click. other animation for this object in progress.');
        return;
    }
    object.animation_state = (object.animation_state + 1) % 4;
    object.current_animation_start_time = (new Date()).getTime();
    if(object.animation_state == 1){ //if positioning this object, put all the others back to their original position
        scene.objectsBackToOriginalPositionExcept(object);
        current_animated_object_name = object.name;
    }
    else if (object.animation_state == 3){ //if positioning this object in its original position, immediately hide all menus
        hideObjectInfoOverlayMenus(object.name);
    }
    console.log('new animation state: ' + object.animation_state);
}