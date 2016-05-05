/**
 * Created by João on 10/03/2016.
 */
var scene, camera, renderer, controls, mouseVector, raycaster;
var geometry, material, mesh;
var objsContainer;

var textures = [];
var objects = [];
var pickable_objects = [];

// time stamp used to calculate animation evolution
var last_animation;

// this variable will store the last clicked object.
// app will ignore other clicks while this is being animated.
var current_animated_object_name = null;

function tridimensional_model_ready(current_room){
    //console.log("chegou aqui model ready");
    tridimensional_model_init(current_room);
    tridimensional_model_animate();
}


function tridimensional_model_init(current_room) {
    console.log('model init');
    textures = [];
    objects = [];
    pickable_objects = [];
    current_animated_object_name = null;
    last_animation = (new Date()).getTime();

    //window.addEventListener( 'mousemove', onMouseMove, false );
    document.addEventListener( 'mousedown', onDocumentMouseDown, true );

    scene = new THREE.Scene();

    var ambient = new THREE.AmbientLight( 0xAAAAAA );
    scene.add( ambient );

    var directionalLight = new THREE.DirectionalLight( 0xffeedd );
    directionalLight.position.set( 0, 0, 1 ).normalize();
    scene.add( directionalLight );

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;

    raycaster = new THREE.Raycaster();
    mouseVector = new THREE.Vector2();

    objsContainer = [];

    //THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

    //textures
    //loadTexture('sample', 'obj/texture.jpg', textures);
    //loadTexture('casadamusica', 'obj/casadamusica/texturas/casa_da_musica_uvmap.png', textures);
    for(var key in models){
        loadTexture(models[key].name, models[key].texture_path, textures);
    }
    // models
    //loadObjModel('teapot', 'Bule', 'obj/teapot.obj', [-200, 50, 0], 30, objects, pickable_objects, textures['sample'], scene, [20, 1, 0], 0.5);
    //loadObjModel('person', 'Pessoa', 'obj/male02.obj', [100, -150, 0], 3.5, objects, pickable_objects, textures['sample'], scene, [20, 0, 0], 0.5);
    var y_coord = 100;
    for(var key in models){
        var active = false;
        if(current_room != null && current_room == key)
            active = true;
        console.log(current_room + ' - ' + key);
        loadObjModel(models[key].name, models[key].title, models[key].path, [0, y_coord, 0], 100, objects, pickable_objects, textures[models[key].name], scene, [20, 0, 0], 0.5, active);
        y_coord -= 200;
    }

    //loadObjMtl(scene);
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth, window.innerHeight);
    console.log('orientation ' + window.orientation);


    controls = new THREE.OrbitControls( camera, renderer.domElement );
    //controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
    controls.enableDamping = true;
    controls.dampingFactor = 0.9;
    controls.enableZoom = true;
    controls.minDistance = 700;
    controls.maxDistance = 1500;

    renderer.setClearColor( 0x4FB9D3, 1 );

    renderer.domElement.setAttribute('id', 'model-main-canvas');
    document.getElementById('model-canvas-container').html = '';

    document.getElementById('model-canvas-container').appendChild( renderer.domElement );

    window.addEventListener("orientationchange", function(){
        //console.log(screen.orientation); // e.g. portrait
        
        camera.aspect = window.screen.width / window.screen.height;
        camera.updateProjectionMatrix();

        renderer.setSize( window.screen.width, window.screen.height);
    });

}

function tridimensional_model_animate() {

    requestAnimationFrame( tridimensional_model_animate );

    /*mesh.rotation.x += 0.01;
     mesh.rotation.y += 0.02;*/
    var temp_millis = (new Date()).getTime();
    if(temp_millis - last_animation > 20){
        last_animation = temp_millis;
        for(var key in objects){
            animateObject(objects[key]);
        }
    }
    renderer.render( scene, camera );

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
        mouseVector.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
        mouseVector.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
        console.log('1---------------------------------------------------');
        console.log('##$$processing touch');
        console.log('mouse x: ' + mouseVector.x + ' -- mouse y: ' + mouseVector.y);
        console.log('event x: ' + event.clientX + ' -- event y: ' + event.clientY);
        console.log('position top: ' + position.top + ' -- position left: ' + position.left);
        console.log('width: ' + renderer.domElement.width + ' -- height: ' + renderer.domElement.height);

        raycaster = new THREE.Raycaster();
        raycaster.setFromCamera( mouseVector.clone(), camera );
        var intersects = raycaster.intersectObjects( pickable_objects, true );
        console.log('intersects length: ' + intersects.length);
        console.log('---------------------------------------------------');
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
    for(var key in objects){
        if(key != object.name){
            if(objects[key].animation_state == 2){
                objects[key].current_animation_start_time = (new Date()).getTime();
                objects[key].animation_state++;
                hideObjectInfoOverlayMenus(objects[key].name);
            }
            else if(objects[key].animation_state == 1){
                objects[key].pendent_animations++;
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
