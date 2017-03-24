ContactManager.module("ContactsApp.List", function(
			List, ContactManager, Backbone, Marionette, $, _){
	List.Contact = Marionette.ItemView.extend({
		tagName: "tr",
		template: "#contact-list-item",

		events: {
			"click": "highlightName"
		},

		highlightName: function() {
			this.$el.toggleClass("warning");
		}
	}); // end List.Contact

	List.Contacts = Marionette.CompositeView.extend({
		tagName: "table",
		className: "table table-hover table-striped",
		template: "#contact-list",
		childView: List.Contact,
		childViewContainer: "tbody"
	}); // end List.Contacts
}) // end ContactManager.module