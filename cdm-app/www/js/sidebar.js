/**
 * Created by João on 04/05/2016.
 */
function sidebar_ready(id){
    document.addEventListener( 'mousedown', function ( event ) { sidebar_onDocumentMouseDown(event, id); } , true );
};

function sidebar_onDocumentMouseDown(event, sidebar_id){
    //console.log('click - ' + event.target.getAttribute('id'));
    if(event.target.getAttribute('id') != 'sidebar-menu-ul'
        && event.target.getAttribute('id') != 'menu-btn'
        && !$('#'+sidebar_id).hasClass('hidden')){
        hideSidebar(sidebar_id);
    }
}

function showSidebar(sidebar_id){
    //console.log('going to show');
    $('#'+sidebar_id).show("slide", { direction: "left" }, 500, function(){ $('#'+sidebar_id).removeClass('hidden'); });
}

function hideSidebar(sidebar_id){
    $('#'+sidebar_id).addClass('hidden');
    $('#'+sidebar_id).hide("slide", { direction: "left" }, 500);
}
