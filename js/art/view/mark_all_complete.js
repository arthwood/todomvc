art.view.MarkAllComplete = artjs.Class(
	function(element) {
		this.super(element);

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
			var pluck = artjs.Array.pluck(items, 'completed');

			this.setChecked(artjs.Array.all(pluck));
		}
	},
	{
		toString: function() {
			return 'art.view.MarkAllComplete';
		}
	},
	artjs.CheckBox
);
