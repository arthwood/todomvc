art.view.MarkAllComplete = artjs.Class(
	function(element) {
		this.super(element);

		artjs.Component.onLoad('todo-list', artjs.$D(this, '_onListLoad'));
	},
	{
		_onListLoad: function(list) {
			this._listModel = list.getModel();
			this._listModel.onItemChange.add(artjs.$D(this, '_onItemChange'));
		},

		_onItemChange: function() {
			this._update(this._listModel.items);
		},

		_update: function(items) {
			var pluck = artjs.Array.pluck(items, 'completed');

			this.setChecked(artjs.Array.all(pluck));
		}
	},
	{
		_name: 'art.view.MarkAllComplete'
	},
	artjs.CheckBox
);
