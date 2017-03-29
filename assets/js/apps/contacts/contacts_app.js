ContactManager.module("ContactsApp", function(ContactsApp, ContactManager,
						Backbone, Marionette, $, _) {
	ContactsApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			"contacts": "listContacts"
		}
	}); // end ContactsApp.Router

	var API = {
		listContacts: function() {
			ContactsApp.List.Controller.listContacts();
		}
	}; // end API

	ContactManager.on("contacts:list", function() {
		ContactManager.navigate("contacts");
		API.listContacts();
	});

	ContactsApp.on("start", function() {
		new ContactsApp.Router({
			controller: API
		});
	}); // end ContactsApp.on
}); // end ContactManager.module
