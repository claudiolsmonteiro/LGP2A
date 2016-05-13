/**
 * Created by João on 10/03/2016.
 */

function tridimensional_model_ready(environment){
    tridimensional_model_init(environment);
    //tridimensional_model_animate();
}

function model_increment_textures_loaded(environment){
    environment.textures_loaded++;
    return Object.size(models) == environment.textures_loaded;
}

function tridimensional_model_init(environment) {

    document.addEventListener( 'mousedown', function( e ) { onDocumentMouseDown( e, environment );}, true );

    var ambient = new THREE.AmbientLight( 0x333333 );
    environment.scene.add( ambient );

    /*var directionalLight = new THREE.DirectionalLight( 0xffeedd );
    directionalLight.position.set( 0, 0, 1 ).normalize();
    scene.add( directionalLight );

    var directionalLight2 = new THREE.DirectionalLight( 0xffeedd );
    directionalLight2.position.set( 0, 0, 1 ).normalize();
    scene.add( directionalLight2 );*/

    var pointLight = new THREE.PointLight( 0xeeeeee, 1.7, 1000 );
    pointLight.position.set( 500, 200, 500 );
    environment.lights.push(pointLight);

    var pointLight2 = new THREE.PointLight( 0xeeeeee, 1.7, 1000 );
    pointLight2.position.set( -500, 200, 500 );
    environment.lights.push(pointLight2);

    var pointLight3 = new THREE.PointLight( 0xeeeeee, 1, 1000 );
    pointLight3.position.set( 0, 700, 0 );
    environment.lights.push(pointLight3);

    var pointLight4 = new THREE.PointLight( 0xeeeeee, 1.7, 1000 );
    pointLight4.position.set( -500, 200, -500 );
    environment.lights.push(pointLight4);

    var pointLight5 = new THREE.PointLight( 0xeeeeee, 1.7, 1000 );
    pointLight5.position.set( 500, 200, -500 );
    environment.lights.push(pointLight5);

    for (var i in environment.lights){
        environment.scene.add(environment.lights[i]);
    }

    //textures
    for(var key in models){
        loadTexture(environment, key, model_increment_textures_loaded, model_loadObjects, tridimensional_model_animate);
    }

    environment.renderer.domElement.setAttribute('id', 'model-main-canvas');
    document.getElementById('model-canvas-container').html = '';
    document.getElementById('model-canvas-container').appendChild( environment.renderer.domElement );
    window.addEventListener("orientationchange", function(){
        //console.log(screen.orientation); // e.g. portrait
        environment.camera.aspect = window.screen.width / window.screen.height;
        environment.camera.updateProjectionMatrix();
        environment.renderer.setSize( window.screen.width, window.screen.height);
    });

    var axes = buildAxes( 1000 );
    environment.scene.add(axes);

}

function tridimensional_model_animate(environment) {
    /*console.log('#########################################');
    console.log('textures loaded: ' + model_textures_loaded);
    console.log('models size: ' +  Object.size(models));
    console.log(model_objects_loaded? 'objects started loading ' : 'objects didn\'t start loading');
    console.log(model_textures);
    console.log('#########################################');
    */
    requestAnimationFrame( function(){tridimensional_model_animate(environment)} );

    var temp_millis = (new Date()).getTime();
    if(temp_millis - environment.last_animation > 20){
        environment.last_animation = temp_millis;
        for(var key in environment.objects){
            animateObject(environment.objects[key]);
        }
    }
    environment.renderer.render( environment.scene, environment.camera );

}


function model_loadObjects(environment){
    var y_coord = 100;
    for(var key in models){
        var active = false;
        if(environment.current_room != null && environment.current_room == key)
            active = true;
        console.log(environment.current_room + ' - ' + key);
        //loadObjModel(models[key].name, models[key].title, models[key].path, [0, y_coord, 0], 100, model_objects, model_pickable_objects, model_textures[models[key].name], model_scene, models[key].animation, 0.5, active);
        loadObjModel(environment, key, [0, y_coord, 0], 100, 0.5, active);
        //y_coord -= 200;
    }
}


function onDocumentMouseDown( event , environment ) {
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
        environment.mouseVector.x = ( event.clientX / environment.renderer.domElement.clientWidth ) * 2 - 1;
        environment.mouseVector.y = - ( event.clientY / environment.renderer.domElement.clientHeight ) * 2 + 1;

        environment.raycaster = new THREE.Raycaster();
        environment.raycaster.setFromCamera( environment.mouseVector.clone(), environment.camera );
        var intersects = environment.raycaster.intersectObjects( environment.pickable_objects, true );

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

function animateObjectAux(room_id, environment){
    environment.objects[room_id].mesh.callback();
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

THREE.Scene.prototype.objectsBackToOriginalPositionExcept = function (object, environment) {
    for(var key in environment.objects){
        if(key != object.name){
            if(environment.objects[key].animation_state == 2){
                environment.objects[key].current_animation_start_time = (new Date()).getTime();
                environment.objects[key].animation_state++;
                hideObjectInfoOverlayMenus(environment.objects[key].name);
            }
            else if(environment.objects[key].animation_state == 1){
                environment.objects[key].pendent_animations++;
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
