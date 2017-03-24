var ContactManager = new Marionette.Application();

ContactManager.on("before:start", function(){
	var RegionContainer = Marionette.LayoutView.extend({
		el: "#app-container",
		regions: {
			main: "#main-region"
		}
	});
	ContactManager.regions = new RegionContainer();
}); // end ContactManager.on

ContactManager.on("start", function(){
	ContactManager.ContactsApp.List.Controller.listContacts();
}); // end ContactManager.on
