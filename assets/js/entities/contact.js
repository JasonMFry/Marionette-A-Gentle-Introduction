ContactManager.module("Entities", function(
			Entities, ContactManager, Backbone, Marionette, $, _) {
	Entities.Contact = Backbone.Model.extend({
		urlRoot: "contacts"
	}); // end Entities.Contact

	Entities.configureStorage("ContactManager.Entities.Contact");

	Entities.ContactCollection = Backbone.Collection.extend({
		url: "contacts",
		model: Entities.Contact,
		// comparator: "firstName"
		comparator: function(contact) {
			return contact.get("firstName") + contact.get("lastName");
		}
	}); // end Entities.ContactCollection

	Entities.configureStorage("ContactManager.Entities.ContactCollection");

	var contacts;

	var initializeContacts = function(){
		var contacts = new Entities.ContactCollection([
			{ id: 1, firstName: "Alice", lastName: "Arten",
			  phoneNumber: "555-0184" },
			{ id: 2, firstName: "Bob", lastName: "Brigham",
			  phoneNumber: "555-0163" },
			{ id: 3, firstName: "Charlie", lastName: "Campbell",
			  phoneNumber: "555-0129" }
			]);
		contacts.forEach(function(contact) {
			contact.save();
		});
		return contacts.models;
	}; // end initializeContacts

	var API = {
		getContactEntities: function() {
			var contacts = new Entities.ContactCollection();
			var defer = $.Deferred();
			contacts.fetch({
				success: function(data) {
					defer.resolve(data);
				},
				error: function(data) {
					defer.resolve(undefined);
				}
			});
			var promise = defer.promise();
			$.when(promise).done(function(fetchedContacts) {
				if (fetchedContacts.length === 0) {
					var models = initializeContacts();
					contacts.reset(models);
				}
			})
			return promise;
		},

		getContactEntity: function(contactId){
			var contact = new Entities.Contact({id: contactId});
			var defer = $.Deferred();
			setTimeout(function() {
				contact.fetch({
					success: function(data) {
						defer.resolve(data);
					},
					error: function(data) {
						defer.resolve(undefined);
					}
				});
			}, 2000);
			return defer.promise();
		}
	}; // end API

ContactManager.reqres.setHandler("contact:entities", function() {
	return API.getContactEntities();
});

ContactManager.reqres.setHandler("contact:entity", function(id){
	return API.getContactEntity(id);
}); // end ContactManager.reqres

}); // end ContactManager.module