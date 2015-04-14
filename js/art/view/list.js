art.view.List = artjs.Class(
	function(element) {
		this.super(element);

		this._handle('Todo::New', '_onNew');
		this._handle('MarkAllComplete', '_onMarkAllComplete');
		this._handleEmit('Item::Delete', '_onDelete');

		this.setItems(art.service.db.items);
	},
	{
		_onNew: function(text) {
			var value = text.getValue();

			this.addItem(new art.model.Item(value));
		},

		_onDelete: function(item) {
			this.removeItem(item.getModel());
		},

		_onMarkAllComplete: function(checkbox) {
			this._allComplete = checkbox.isChecked();

			artjs.Array.each(this._model.items, this._markAsComplete, this);
		},

		_markAsComplete: function(item) {
			item.completed = this._allComplete;
		}
	},
	{
		_name: 'art.view.List'
	},
	artjs.ListView
);
