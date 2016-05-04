/**
 * Created by João on 04/05/2016.
 */

function sidebar_ready(){
    console.log('ready');
    document.addEventListener( 'mousedown', sidebar_onDocumentMouseDown, true );

};

function sidebar_onDocumentMouseDown(event){
    console.log('click' + event.target.getAttribute('id'));
    if(event.target.getAttribute('id') != 'toggle-sidebar'){
        if(event.target.getAttribute('id') != 'sidebar-menu-ul'){
            hideSidebar();
        }
        return;
    }


    console.log('click sidebar');
    if($('#toggle-sidebar').hasClass('fa-caret-right')){
        showSidebar();
    }
    else{
       hideSidebar();
    }

}

function showSidebar(){
    $('#sidebar-menu').show("slide", { direction: "left" }, 500);
    $('#toggle-sidebar').removeClass('fa-caret-right');
    $('#toggle-sidebar').addClass('fa-caret-left');
}

function hideSidebar(){
    $('#sidebar-menu').hide("slide", { direction: "left" }, 500);
    $('#toggle-sidebar').removeClass('fa-caret-left');
    $('#toggle-sidebar').addClass('fa-caret-right');
}