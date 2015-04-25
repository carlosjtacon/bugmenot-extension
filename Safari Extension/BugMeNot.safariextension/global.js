//Global scripts for the entire application

//returns the url of the active tab
function current_URL () {
    // alert("hola")
    return safari.application.activeBrowserWindow.activeTab.url;
};

//captures the event when clicking on a toolbar item
safari.application.addEventListener("command",handleToolBarEvent,false)
function handleToolBarEvent(event){
    //check if our toolbar item is the clicked
    if (event.target.command != "unbug") return;
    var item = event.target;
    //if a popover already exists, deallocate it
    if (item.popover != null) {
        var id = item.popover.identifier;
        item.popover.hide();
        item.popover = null;
        safari.extension.removePopover(id);
    };
    //create popover and display it   
    var popover = safari.extension.createPopover("main",safari.extension.baseURI +"popover.html",300,400);
    item.popover = popover;
    item.showPopover();
};

/* deallocate the popover every time a new window/tap is activated
*  this is done in order to avoid conflicts when working with more than one 
*  window
*/

safari.application.addEventListener("activate",handleOpenEvent,true)
function handleOpenEvent(event){
    safari.extension.removePopover("main")
}