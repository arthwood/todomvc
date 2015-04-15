art.view.List = artjs.Class(
	function(element) {
		this.super(element);

		this._handle('Todo::New', '_onNew');
		this._handle('MarkAllComplete', '_onMarkAllComplete');
		this._handle('ClearCompleted', '_onClearCompleted');
		this._handleEmit('Item::Delete', '_onDelete');

		this.setItems(art.service.db.items);

		this._fire('Items::Change');
	},
	{
		_onNew: function(text) {
			var value = text.getValue();

			this.addItem(new art.model.Item(value));

			this._fire('Items::Change');
		},

		_onDelete: function(item) {
			this.removeItem(item.getModel());

			this._fire('Items::Change');
		},

		_onMarkAllComplete: function(checkbox) {
			this._allComplete = checkbox.isChecked();

			artjs.Array.each(this._model.items, this._markAsComplete, this);
		},

		_onClearCompleted: function() {
			this.removeItems(artjs.Array.select(this._model.items, this._isCompleted, this));
		},

		_markAsComplete: function(item) {
			item.completed = this._allComplete;
		},

		_isCompleted: function(item) {
			return item.completed;
		}
	},
	{
		_name: 'art.view.List'
	},
	artjs.ListView
);
