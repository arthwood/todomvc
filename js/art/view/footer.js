art.view.Footer = artjs.Class(
	function(element) {
		this.super(element);

		this._handle('Item::Count', '_onCount');
	},
	{
		_onCount: function(count) {
			artjs.Element.setVisible(this._element, count.getModel().n > 0);
		}
	},
	{
		_name: 'art.view.Footer'
	},
	artjs.Component
);
