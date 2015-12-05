art.view.MarkAllComplete = artjs.Class(
  function(element) {
    this.super(element);

    this._listWatcher = new art.service.ListWatcher('todo-list', this);
  },
  {
    onListUpdate: function(listModel) {
      var pluck = artjs.Array.pluck(listModel.items, 'completed');

      this.setChecked(artjs.Array.all(pluck));
    }
  },
  {
    _name: 'art.view.MarkAllComplete'
  },
  artjs.CheckBox
);
