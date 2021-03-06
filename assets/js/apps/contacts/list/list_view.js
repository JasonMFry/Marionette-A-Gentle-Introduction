ContactManager.module("ContactsApp.List", function(
			List, ContactManager, Backbone, Marionette, $, _){
	// the below List.[etcs] originate in index.html.  This document controls
	// their view with various options passed in, and functions that get called
	// when elements get interacted with.
	List.Layout = Marionette.LayoutView.extend({
		template: "#contact-list-layout",

		regions: {
			panelRegion: "#panel-region",
			contactsRegion: "#contacts-region"
		}
	});

	List.Panel = Marionette.ItemView.extend({
		template: "#contact-list-panel"
	});

	List.Contact = Marionette.ItemView.extend({
		tagName: "tr",
		template: "#contact-list-item",

		events: {
			"click": "highlightName",
			"click button.js-delete": "deleteClicked",
			"click td a.js-show": "showClicked",
			"click td a.js-edit": "editClicked"
		},

		flash: function(cssClass) {
			var $view = this.$el;
			$view.hide().toggleClass(cssClass).fadeIn(800, function() {
				setTimeout(function() {
					$view.toggleClass(cssClass);
				}, 500);
			});
		},

		highlightName: function(e) {
			this.$el.toggleClass("warning");
		},

		showClicked: function(e) {
			e.preventDefault();
			e.stopPropagation();
			this.trigger("contact:show", this.model);
		},

		editClicked: function(e) {
			e.preventDefault();
			e.stopPropagation();
			this.trigger("contact:edit", this.model);
		},

		deleteClicked: function(e) {
			e.stopPropagation();
			this.trigger("contact:delete", this.model);
		},

		remove: function() {
			var self = this;
			this.$el.fadeOut(function() {
				Marionette.ItemView.prototype.remove.call(self);
			});
		}
	}); // end List.Contact

	List.Contacts = Marionette.CompositeView.extend({
		tagName: "table",
		className: "table table-hover table-striped",
		template: "#contact-list",
		childView: List.Contact,
		childViewContainer: "tbody"
	}); // end List.Contacts
}); // end ContactManager.module