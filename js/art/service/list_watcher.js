art.service.ListWatcher = artjs.Class(
  function(listId, updateable) {
    this._listId = listId;
    this._updateable = updateable;

    artjs.Component.onLoad(this._listId, artjs.$D(this, '_onListLoad'));
  },
  {
    toString: function() {
      return this.ctor.toString + ' - listId: ' + this._listId + ', updateable: ' + this._updateable.toString();
    },

    _onListLoad: function(list) {
      var onUpdateDelegate = artjs.$D(this, '_onUpdate');
      this._listModel = list.getModel();

      this._listModel.onItemAdd.add(onUpdateDelegate);
      this._listModel.onItemRemove.add(onUpdateDelegate);
      this._listModel.onItemChange.add(onUpdateDelegate);
      this._listModel.addPropertyListener('items', onUpdateDelegate, true);
    },

    _onUpdate: function() {
      this._updateable.update(this._listModel);
    }
  },
  {
    _name: 'art.service.ListWatcher',

    toString: function() {
      return this._name;
    }
  }
);
