ContactManager.module("ContactsApp", function(ContactsApp, ContactManager,
						Backbone, Marionette, $, _) {
	ContactsApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			"contacts": "listContacts",
			"contacts/:id": "showContact"
		}
	}); // end ContactsApp.Router

	var API = {
		listContacts: function() {
			ContactsApp.List.Controller.listContacts();
		},

		showContact: function(id) {
			ContactsApp.Show.Controller.showContact(id);
		}
	}; // end API

	ContactManager.on("contacts:list", function() {
		ContactManager.navigate("contacts");
		API.listContacts();
	});

	ContactManager.on("contact:show", function(id) {
		ContactManager.navigate("contacts/" + id);
		API.showContact(id);
	});

	ContactsApp.on("start", function() {
		new ContactsApp.Router({
			controller: API
		});
	}); // end ContactsApp.on
}); // end ContactManager.module
