art.view.Footer = artjs.Class(
	function(element) {
		this.super(element);

		this._listWatcher = new art.service.ListWatcher(this);
	},
	{
		update: function(listModel) {
			artjs.Element.setVisible(this._element, artjs.Array.isNotEmpty(listModel.items));
		}
	},
	{
		_name: 'art.view.Footer'
	},
	artjs.Component
);
