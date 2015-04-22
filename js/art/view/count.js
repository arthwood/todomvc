art.view.Count = artjs.Class(
	function(element) {
		this.super(element);

		var model = new artjs.Model();

		model.addProperty('n');

		this.setModel(model);

		this._onItemsChangeDelegate = artjs.$D(this, '_onItemsChange');

		artjs.Component.onLoad('todo-list', artjs.$D(this, '_onListLoad'));
	},
	{
		_onListLoad: function(list) {
      list.getModel().addPropertyListener('items', this._onItemsChangeDelegate);
    },

		_onItemsChange: function(data) {
			this._update(data.newValue);
		},

		_update: function(items) {
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
