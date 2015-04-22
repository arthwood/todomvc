art.view.ItemLabel = artjs.Class(
	function(element) {
		this.super(element);

		artjs.on('dblclick', element, artjs.$D(this, '_onDblClick'));
	},
	{
		_onDblClick: function() {
			this._fire('Item::DblClick');
		}
	},
	{
		_name: 'art.view.ItemLabel'
	},
	artjs.Component
);
