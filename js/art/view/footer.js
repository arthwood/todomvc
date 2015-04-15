art.view.Footer = artjs.Class(
	function(element) {
		this.super(element);

		this._handle('Items::Change', '_onItemsChange');
	},
	{
		_onItemsChange: function(list) {
			artjs.Element.setVisible(this._element, artjs.Array.isNotEmpty(list.getModel().items));
		}
	},
	{
		_name: 'art.view.Footer'
	},
	artjs.Component
);
