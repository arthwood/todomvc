//These are here just to show the structure of the list items
//List items should get the class `editing` when editing and `completed` when marked as completed
art.view.Item = artjs.Class(
	function(element) {
		this.super(element);

		artjs.on('click', element, this._onEdit.delegate);

		this._handleEmit('Item::Save', '_onSave');
		this._handleEmit('Item::Button::Delete', '_onDelete');

		this._editing = false;
	},
	{
		_onEdit: function() {
			if (!this._editing) {
				this._editing = true;

				artjs.Element.addClass(this._element, this.ctor.EDITING_CLASS);

				this._fire('Item::Edit');
			}
		},

		_onDelete: function() {
			this._fire('Item::Delete');
		},

		_onSave: function(item) {
			this._editing = false;

			var value = artjs.String.trim(item.getValue());

			artjs.Element.removeClass(this._element, this.ctor.EDITING_CLASS);

			if (artjs.String.isPresent(value)) {
				this._model.value = value;
			}
		}
	},
	{
		EDITING_CLASS: 'editing',

		_name: 'art.view.Item'
	},
	artjs.TemplateView
);
