art.view.MarkAllComplete = artjs.Class(
	function(element) {
		this.super(element);

		artjs.ListListener.create(this, 'todo-list', this._onItemsChange.delegate);
	},
	{
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
