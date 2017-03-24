ContactManager.module("ContactsApp.List", function(
			List, ContactManager, Backbone, Marionette, $, _){
	List.Contact = Marionette.ItemView.extend({
		tagName: "li",
		template: "#contact-list-item"
	}); // end List.Contact

	List.Contacts = Marionette.CollectionView.extend({
		tagName: "ul",
		childView: List.Contact
	}); // end List.Contacts
}) // end ContactManager.module