art.service.ListWatcher = artjs.Class(
	function(updateable) {
		this._updateable = updateable;

		this._onItemAddDelegate = artjs.$D(this, '_onItemAdd');
		this._onItemRemoveDelegate = artjs.$D(this, '_onItemRemove');
		this._onItemChangeDelegate = artjs.$D(this, '_onItemChange');
		this._onItemsChangeDelegate = artjs.$D(this, '_onItemsChange');

		artjs.Component.onLoad('todo-list', artjs.$D(this, '_onListLoad'));
	},
	{
		_onListLoad: function(list) {
			this._listModel = list.getModel();

			this._listModel.onItemAdd.add(this._onItemAddDelegate);
			this._listModel.onItemRemove.add(this._onItemRemoveDelegate);
			this._listModel.onItemChange.add(this._onItemChangeDelegate);
			this._listModel.addPropertyListener('items', this._onItemsChangeDelegate, true);
		},

		_onItemAdd: function() {
			this._update();
		},

		_onItemRemove: function() {
			this._update();
		},

		_onItemsChange: function() {
			this._update();
		},

		_onItemChange: function() {
			this._update();
		},

		_update: function() {
			this._updateable.update(this._listModel);
		}
	}
);
