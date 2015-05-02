art.view.ClearCompleted = artjs.Class(
	function(element) {
		this.super(element);

		this._listWatcher = new art.service.ListWatcher(this);
	},
	{
		update: function(listModel) {
			var items = listModel.items;

			artjs.Element.setVisible(this._element, artjs.Array.any(artjs.Array.pluck(items, 'completed')));
		}
	},
	{
		_name: 'art.view.ClearCompleted'
	},
	artjs.Button
);
