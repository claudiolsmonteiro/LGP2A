/**
 * Created by João on 04/05/2016.
 */


controllerModule.service('sidebarUtils', function () {
    var sidebarUtils = this;

    sidebarUtils.current_listener_function = null;

    sidebarUtils.sidebar_ready = function (id){
        if(sidebarUtils.current_listener_function != null) {
            document.removeEventListener('mousedown', sidebarUtils.current_listener_function);
        }
        sidebarUtils.current_listener_function = function ( event ) { sidebarUtils.sidebar_onDocumentMouseDown(event, id); };
        document.addEventListener( 'mousedown', sidebarUtils.current_listener_function, true );
    };

    sidebarUtils.sidebar_onDocumentMouseDown = function (event, sidebar_id){
        //console.log('click - ' + event.target.getAttribute('id'));
        if(event.target.getAttribute('id') != 'sidebar-menu-ul'
            && event.target.getAttribute('id') != 'menu-btn'
            && !$('#'+sidebar_id).hasClass('hidden')){
            sidebarUtils.hideSidebar(sidebar_id);
        }
    };

    sidebarUtils.showSidebar = function(sidebar_id){
        $('#'+sidebar_id).show("slide", { direction: "left" }, 500, function(){ $('#'+sidebar_id).removeClass('hidden'); });
    };

    sidebarUtils.hideSidebar = function(sidebar_id){
        $('#'+sidebar_id).addClass('hidden');
        $('#'+sidebar_id).hide("slide", { direction: "left" }, 500);
    };

});