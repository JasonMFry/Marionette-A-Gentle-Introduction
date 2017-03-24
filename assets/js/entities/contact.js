ContactManager.module("Entities", function(
			Entities, ContactManager, Backbone, Marionette, $, _) {
	Entities.Contact = Backbone.Model.extend({}); // end Entities.Contact

	Entities.ContactCollection = Backbone.Collection.extend({
		model: Entities.Contact,
		comparator: function(contact) {
			return contact.get("firstName") + contact.get("lastName");
		}
	}); // end Entities.ContactCollection

	var contacts;

	var initializeContacts = function(){
		contacts = new Entities.ContactCollection([
			{ id: 1, firstName: "Alice", lastName: "Arten",
			  phoneNumber: "555-0184" },
			{ id: 2, firstName: "Bob", lastName: "Brigham",
			  phoneNumber: "555-0163" },
			{ id: 3, firstName: "Charlie", lastName: "Campbell",
			  phoneNumber: "555-0129" }
			]);
	}; // end initializeContacts

	var API = {
		getContactEntities: function(){
			if (contacts === undefined ) {
				initializeContacts();
			}
			return contacts;
		}
	}; // end API

ContactManager.reqres.setHandler("contact:entities", function(){
	return API.getContactEntities();
}); // end ContactManager.reqres

}); // end ContactManager.module