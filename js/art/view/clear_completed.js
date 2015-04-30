art.view.ClearCompleted = artjs.Class(
	function(element) {
		this.super(element);

		artjs.Component.onLoad('todo-list', artjs.$D(this, '_onListLoad'));
	},
	{
		_onListLoad: function(list) {
			this._listModel = list.getModel();

			this._listModel.onItemChange.add(artjs.$D(this, '_onItemChange'));
			this._listModel.addPropertyListener('items', artjs.$D(this, '_onItemsChange'), true);
		},

		_onItemChange: function() {
			this._update();
		},

		_onItemsChange: function() {
			this._update();
		},

		_update: function() {
			var items = this._listModel.items;

			artjs.Element.setVisible(this._element, artjs.Array.any(artjs.Array.pluck(items, 'completed')));
		}
	},
	{
		_name: 'art.view.ClearCompleted'
	},
	artjs.Button
);
