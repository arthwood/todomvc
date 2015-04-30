art.view.List = artjs.Class(
	function(element) {
		this.super(element);

		this._localStorage = new artjs.LocalStorage('todos-artjs');

		this._model.onItemChange.add(artjs.$D(this, '_onItemChange'));
		this._model.addPropertyListener('items', artjs.$D(this, '_onItemsChange'));

		artjs.Broadcaster.addListener('Filter', artjs.$D(this, '_onFilter'));

		this._handle('Todo::New', '_onNew');
		this._handle('MarkAllComplete', '_onMarkAllComplete');
		this._handle('ClearCompleted', '_onClearCompleted');
		this._handleEmit('Item::Delete', '_onDelete');

		this.setItems(art.model.Item.fromArray(this._localStorage.getItem('items') || art.service.db.items));
	},
	{
		_onNew: function(text) {
			var value = text.getValue();

			this.addItem(new art.model.Item(value));
		},

		_onDelete: function(item) {
			this.removeItem(item.getModel());
		},

		_onItemChange: function() {
			this._storeItems();
		},

		_onItemsChange: function() {
			this._storeItems();
		},

		_storeItems: function() {
			var items = this._model.items;

			if (!artjs.Object.isNull(items)) {
				items = artjs.Array.invoke(items, 'toJson');
			}

			this._localStorage.setItem('items', items);
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
		},

		_isActive: function(item) {
			return !item.completed;
		},

		_true: function() {
			return true;
		},

		_onFilter: function(id) {
			this._visibilityStrategy = this.ctor.VISIBILITY_STRATEGIES[id] || '_true';

			artjs.Array.each(this._model.items, this._setItemVisibility, this);
		},

		_setItemVisibility: function(item) {
			item.visible = this[this._visibilityStrategy](item);
		}
	},
	{
		_name: 'art.view.List',

		VISIBILITY_STRATEGIES: {
			completed: '_isCompleted',
			active: '_isActive'
		}
	},
	artjs.ListView
);
