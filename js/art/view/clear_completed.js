art.view.ClearCompleted = artjs.Class(
  function(element) {
    this.super(element);

    this._listWatcher = new art.service.ListWatcher('todo-list', this);
  },
  {
    onListUpdate: function(listModel) {
      artjs.Element.setVisible(this._element, artjs.Array.any(artjs.Array.pluck(listModel.items, 'completed')));
    }
  },
  {
    _name: 'art.view.ClearCompleted'
  },
  artjs.Button
);
