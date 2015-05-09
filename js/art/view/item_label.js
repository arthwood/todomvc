art.view.ItemLabel = artjs.Class(
	function(element) {
		this.super(element);

		artjs.on('dblclick', element, artjs.$D(this, '_onDblClick'));

		this._handleBroadcast('Item::Save', '_onSave');
	},
	{
		_onDblClick: function() {
			this._fire('Item::DblClick');
		},

		_onSave: function(item) {
			artjs.Element.setContent(this._element, item.getModel().value);
		}
	},
	{
		_name: 'art.view.ItemLabel'
	},
	artjs.Component
);
