art.view.Count = artjs.Class(
	function(element) {
		this.super(element);

		var model = new artjs.Model();

		model.addProperty('n');

		this.setModel(model);

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
			var total = items.length;
			var completed = artjs.Array.select(artjs.Array.pluck(items, 'completed')).length;

			this._model.n = total - completed;
		}
	},
	{
		_name: 'art.view.Count'
	},
	artjs.TemplateView
);
