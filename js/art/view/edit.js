art.view.Edit = artjs.Class(
	function(element) {
		this.super(element);

		artjs.on('blur', element, this._onBlur.delegate);
		artjs.on('keydown', element, this._onEnter.delegate, 13);

		this._handleBroadcast('Item::Edit', '_onEdit');
	},
	{
		_onEdit: function(item) {
			this.setValue(item.getModel().value);

			this._element.focus();
		},

		_onBlur: function() {
			this._save();
		},

		_onEnter: function() {
			this._save();
		},

		_save: function() {
			this._fire('Item::Save');
		}
	},
	{
		_name: 'art.view.Edit'
	},
	artjs.Text
);
