art.view.List = artjs.Class(
	function(element) {
		this.super(element);

		this._handle('Todo::New', '_onNew');
		this._handleEmit('Item::Delete', '_onDelete');
	},
	{
		_onNew: function(text) {
			var value = text.getValue();

			this.add(new art.model.Item(value, value));
		},

		_onDelete: function(item) {
			this.remove(item.getModel());
		}
	},
	{
		_name: 'art.view.List'
	},
	artjs.ListView
);
