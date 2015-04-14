art.view.ItemLabel = artjs.Class(
	function(element) {
		this.super(element);

		artjs.on('dblclick', element, this._onDblClick.delegate);
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
