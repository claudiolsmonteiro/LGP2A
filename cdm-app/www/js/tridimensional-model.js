/**
 * Created by João on 10/03/2016.
 */
var model_scene, model_camera, model_renderer, model_controls, model_mouseVector, model_raycaster;
//var model_geometry, model_material, model_mesh;
var model_objsContainer;
var model_lights = [];

var model_textures = [];
var model_objects = [];
var model_pickable_objects = [];
var model_current_room = null;

// time stamp used to calculate animation evolution
var model_last_animation;

// this variable will store the last clicked object.
// app will ignore other clicks while this is being animated.
var current_animated_object_name = null;

//number of textures loaded.
var model_textures_loaded = 0;

function tridimensional_model_ready(current_room){
    model_current_room = current_room;
    tridimensional_model_init(current_room);
    //tridimensional_model_animate();
}

function model_increment_textures_loaded(){
    model_textures_loaded++;
    return Object.size(models) == model_textures_loaded;
}

function tridimensional_model_init(current_room) {
    console.log('model init');
    model_textures = [];
    model_objects = [];
    model_lights = [];
    model_pickable_objects = [];
    current_animated_object_name = null;
    model_last_animation = (new Date()).getTime();
    model_textures_loaded = 0;
    model_raycaster = new THREE.Raycaster();
    model_mouseVector = new THREE.Vector2();
    model_objsContainer = [];

    //window.addEventListener( 'mousemove', onMouseMove, false );
    document.addEventListener( 'mousedown', onDocumentMouseDown, true );

    model_scene = new THREE.Scene();

    var ambient = new THREE.AmbientLight( 0x333333 );
    model_scene.add( ambient );

    /*var directionalLight = new THREE.DirectionalLight( 0xffeedd );
    directionalLight.position.set( 0, 0, 1 ).normalize();
    scene.add( directionalLight );

    var directionalLight2 = new THREE.DirectionalLight( 0xffeedd );
    directionalLight2.position.set( 0, 0, 1 ).normalize();
    scene.add( directionalLight2 );*/

    var pointLight = new THREE.PointLight( 0xeeeeee, 1.7, 1000 );
    pointLight.position.set( 500, 200, 500 );
    model_lights.push(pointLight);

    var pointLight2 = new THREE.PointLight( 0xeeeeee, 1.7, 1000 );
    pointLight2.position.set( -500, 200, 500 );
    model_lights.push(pointLight2);

    var pointLight3 = new THREE.PointLight( 0xeeeeee, 1, 1000 );
    pointLight3.position.set( 0, 700, 0 );
    model_lights.push(pointLight3);

    var pointLight4 = new THREE.PointLight( 0xeeeeee, 1.7, 1000 );
    pointLight4.position.set( -500, 200, -500 );
    model_lights.push(pointLight4);

    var pointLight5 = new THREE.PointLight( 0xeeeeee, 1.7, 1000 );
    pointLight5.position.set( 500, 200, -500 );
    model_lights.push(pointLight5);

    for (var i in model_lights){
        console.log('adding light');
        model_scene.add(model_lights[i]);
    }

    /*var sphereSize = 1;
    var pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
    scene.add( pointLightHelper );*/

    model_camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    model_camera.position.x = 0;
    model_camera.position.y = 200;
    model_camera.position.z = 400;


    //THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

    //textures
    //loadTexture('sample', 'obj/texture.jpg', textures);
    //loadTexture('casadamusica', 'obj/casadamusica/texturas/casa_da_musica_uvmap.png', textures);
    for(var key in models){
       /* model_textures[models[key].name] = new THREE.MeshBasicMaterial ({
            map: THREE.ImageUtils.loadTexture(models[key].texture_path)
        });*/
        loadTexture(models[key].name, models[key].texture_path, model_textures, model_increment_textures_loaded, model_loadObjects, tridimensional_model_animate);
        console.log('######### mandou carregar uma textura ##########');
    }
    // models
    //loadObjModel('teapot', 'Bule', 'obj/teapot.obj', [-200, 50, 0], 30, objects, pickable_objects, textures['sample'], scene, [20, 1, 0], 0.5);
    //loadObjModel('person', 'Pessoa', 'obj/male02.obj', [100, -150, 0], 3.5, objects, pickable_objects, textures['sample'], scene, [20, 0, 0], 0.5);


    //loadObjMtl(scene);
    model_renderer = new THREE.WebGLRenderer();
    model_renderer.setPixelRatio( window.devicePixelRatio );
    model_renderer.setSize(window.innerWidth, window.innerHeight);
    console.log('orientation ' + window.orientation);


    model_controls = new THREE.OrbitControls( model_camera, model_renderer.domElement );
    //controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
    model_controls.enableDamping = true;
    model_controls.dampingFactor = 0.9;
    model_controls.enableZoom = true;
    model_controls.minDistance = 200;
    model_controls.maxDistance = 800;

    model_renderer.setClearColor( 0x4FB9D3, 1 );

    model_renderer.domElement.setAttribute('id', 'model-main-canvas');
    document.getElementById('model-canvas-container').html = '';

    document.getElementById('model-canvas-container').appendChild( model_renderer.domElement );

    window.addEventListener("orientationchange", function(){
        //console.log(screen.orientation); // e.g. portrait

        model_camera.aspect = window.screen.width / window.screen.height;
        model_camera.updateProjectionMatrix();

        model_renderer.setSize( window.screen.width, window.screen.height);
    });


    axes = buildAxes( 1000 );
    model_scene.add(axes);

}

function tridimensional_model_animate() {
    /*console.log('#########################################');
    console.log('textures loaded: ' + model_textures_loaded);
    console.log('models size: ' +  Object.size(models));
    console.log(model_objects_loaded? 'objects started loading ' : 'objects didn\'t start loading');
    console.log(model_textures);
    console.log('#########################################');

    if(model_textures_loaded == Object.size(models) && !model_objects_loaded){
        console.log(model_textures_loaded + ' - ' + Object.size(models));
        model_objects_loaded = true;
        model_loadObjects();
     }*/
    //console.log(model_textures_loaded);

    requestAnimationFrame( tridimensional_model_animate );

    /*mesh.rotation.x += 0.01;
     mesh.rotation.y += 0.02;*/
    var temp_millis = (new Date()).getTime();
    if(temp_millis - model_last_animation > 20){
        model_last_animation = temp_millis;
        for(var key in model_objects){
            animateObject(model_objects[key]);
        }
    }
    model_renderer.render( model_scene, model_camera );

}


function model_loadObjects(){
    var y_coord = 100;
    for(var key in models){
        var active = false;
        if(model_current_room != null && model_current_room == key)
            active = true;
        console.log(model_current_room + ' - ' + key);
        loadObjModel(models[key].name, models[key].title, models[key].path, [0, y_coord, 0], 100, model_objects, model_pickable_objects, model_textures[models[key].name], model_scene, models[key].animation, 0.5, active);
        //y_coord -= 200;
    }
}


function onDocumentMouseDown( event ) {
    //console.log("$$$$$"+event.target.getAttribute('id'));
    if(event.target.getAttribute('id') == 'model-main-canvas'){
        /*mouseVector.x = 2 * (event.clientX / renderer.domElement.clientWidth ) - 1;
         mouseVector.y = 1 - 2 * ( event.clientY /  renderer.domElement.clientHeight );*/

        /*mouseVector.x = ( ( event.clientX - renderer.domElement.offsetLeft ) / renderer.domElement.width ) * 2 - 1;
         mouseVector.y = - ( ( event.clientY - renderer.domElement.offsetTop ) / renderer.domElement.height ) * 2 + 1;*/

        /*mouseVector.x = ( ( event.clientX - position.left  ) / renderer.domElement.width ) * 2 - 1;
         mouseVector.y = - ( ( event.clientY - position.top ) / renderer.domElement.height ) * 2 + 1;*/



        var canvas_container = $("#model-main-canvas");
        var position = canvas_container.offset();
        model_mouseVector.x = ( event.clientX / model_renderer.domElement.clientWidth ) * 2 - 1;
        model_mouseVector.y = - ( event.clientY / model_renderer.domElement.clientHeight ) * 2 + 1;

        model_raycaster = new THREE.Raycaster();
        model_raycaster.setFromCamera( model_mouseVector.clone(), model_camera );
        var intersects = model_raycaster.intersectObjects( model_pickable_objects, true );

        /*console.log('1---------------------------------------------------');
        console.log('##$$processing touch');
        console.log('mouse x: ' + model_mouseVector.x + ' -- mouse y: ' + model_mouseVector.y);
        console.log('event x: ' + event.clientX + ' -- event y: ' + event.clientY);
        console.log('position top: ' + position.top + ' -- position left: ' + position.left);
        console.log('width: ' + model_renderer.domElement.width + ' -- height: ' + model_renderer.domElement.height);
        console.log('intersects length: ' + intersects.length);
        console.log('---------------------------------------------------');*/

        if(intersects.length == 0)
            return;

        //only the first intersection
        var obj = intersects[0].object;
        obj.callback();
        //obj.material.color.setRGB( Math.random(), Math.random(), Math.random() );
    }
    //event.preventDefault();



}

function animateObject(object){

    if(object.animation_state == 0 || object.animation_state == 2){
        return;
    }

    var current_millis = (new Date()).getTime();
    var animation_percentage = (current_millis - object.current_animation_start_time)/1000.0 / object.animation_span;

    if(animation_percentage >= 1){ //if percentage > 100%, animation's over.
        object.animation_state = (object.animation_state + 1) % 4;
        if(object.animation_state == 2){
            showObjectInfoOverlayMenus(object.name, object.title)
            //correct position to the exact one.
            object.position.x = object.original_position[0] + object.animation[0];
            object.position.y = object.original_position[1] + object.animation[1];
            object.position.z = object.original_position[2] + object.animation[2];
        }
        else{// state == 0
            hideObjectInfoOverlayMenus(object.name);

            //correct position to the exact one.
            object.position.x = object.original_position[0];
            object.position.y = object.original_position[1];
            object.position.z = object.original_position[2];
        }
        //check if there are animations yet to be performed.
        if(object.pendent_animations > 0){
            object.pendent_animations--;
            object.current_animation_start_time = (new Date()).getTime();
            object.animation_state = (object.animation_state + 1) % 4;
        }

        return;
    }

    if(object.animation_state == 3){
        animation_percentage = 1 - animation_percentage;
        //if state == 3, we're dealing with the inverse animation, so the position must be decremented, not incremented.
    }

    object.position.x = object.original_position[0] + animation_percentage*object.animation[0];
    object.position.y = object.original_position[1] + animation_percentage*object.animation[1];
    object.position.z = object.original_position[2] + animation_percentage*object.animation[2];

}

THREE.Scene.prototype.objectsBackToOriginalPositionExcept = function (object) {
    for(var key in model_objects){
        if(key != object.name){
            if(model_objects[key].animation_state == 2){
                model_objects[key].current_animation_start_time = (new Date()).getTime();
                model_objects[key].animation_state++;
                hideObjectInfoOverlayMenus(model_objects[key].name);
            }
            else if(model_objects[key].animation_state == 1){
                model_objects[key].pendent_animations++;
            }
        }
    }
}

function showObjectInfoOverlayMenus(objectName, objectTitle){
    //$('#more-details-button').attr('data-obj', objectName).show(100);
    $('#top-info-bar').html(objectTitle.toUpperCase());

    $('#top-info-bar').attr('data-current-object', objectName);
    $('#room_link').attr('href', '#/room/'+objectName);
    $('#top-info-bar').slideDown();
    $('#bottom-navbar').slideDown();
}

function hideObjectInfoOverlayMenus(objectName, objectTitle){
    /*if($('#more-details-button').attr('data-obj') == objectName)
        $('#more-details-button').hide(100);*/

    if ($('#top-info-bar').attr('data-current-object') == objectName){
        $('#top-info-bar').slideUp();
        $('#bottom-navbar').slideUp();
    }
}


function buildAxes( length ) {
    var axes = new THREE.Object3D();

    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( length, 0, 0 ), 0xFF0000, false ) ); // +X
    //axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( -length, 0, 0 ), 0xFF0000, true) ); // -X
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, length, 0 ), 0x00FF00, false ) ); // +Y
    //axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, -length, 0 ), 0x00FF00, true ) ); // -Y
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, length ), 0x0000FF, false ) ); // +Z
    //axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -length ), 0x0000FF, true ) ); // -Z

    return axes;

}

function buildAxis( src, dst, colorHex, dashed ) {
    var geom = new THREE.Geometry(),
        mat;

    if(dashed) {
        mat = new THREE.LineDashedMaterial({ linewidth: 3, color: colorHex, dashSize: 3, gapSize: 3 });
    } else {
        mat = new THREE.LineBasicMaterial({ linewidth: 3, color: colorHex });
    }

    geom.vertices.push( src.clone() );
    geom.vertices.push( dst.clone() );
    geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

    var axis = new THREE.Line( geom, mat, THREE.LinePieces );

    return axis;

}
