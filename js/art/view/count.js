art.view.Count = artjs.Class(
	function(element) {
		this.super(element);

		var model = new artjs.Model();

		model.addProperty('n');

		this.setModel(model);

		artjs.ListListener.create(this, 'todo-list', this._onItemsChange.delegate);
	},
	{
		_onItemsChange: function(data) {
			this._update(data.newValue);
		},

		_onListItemChange: function(list) {
			this._update(list.getModel().items);
		},

		_update: function(items) {
			var total = items.length;
			var completed = artjs.Array.select(artjs.Array.pluck(items, 'completed')).length;

			this._model.n = total - completed;

			this._fire('Item::Count');
		}
	},
	{
		_name: 'art.view.Count'
	},
	artjs.TemplateView
);
