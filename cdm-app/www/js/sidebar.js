/**
 * Created by João on 04/05/2016.
 */
var sidebar_id;
function sidebar_ready(id){
    sidebar_id = id;
    console.log('ready');
    document.addEventListener( 'mousedown', sidebar_onDocumentMouseDown, true );

};

function sidebar_onDocumentMouseDown(event){
    console.log('click - ' + event.target.getAttribute('id'));
    if(event.target.getAttribute('id') != 'sidebar-menu-ul' && !$('#'+sidebar_id).hasClass('hidden')){
        hideSidebar();
    }
    //return;
}

function showSidebar(){
    console.log('going to show');
    $('#'+sidebar_id).removeClass('hidden');
    $('#'+sidebar_id).show("slide", { direction: "left" }, 500);
    /*$('#toggle-sidebar').removeClass('fa-caret-right');
    $('#toggle-sidebar').addClass('fa-caret-left');*/
}

function hideSidebar(){
    $('#'+sidebar_id).addClass('hidden');
    $('#'+sidebar_id).hide("slide", { direction: "left" }, 500);
    /*$('#toggle-sidebar').removeClass('fa-caret-left');
    $('#toggle-sidebar').addClass('fa-caret-right');*/
}
