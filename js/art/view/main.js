art.view.Main = artjs.Class(
  function(element) {
    this.super(element);

    this._listWatcher = new art.service.ListWatcher('todo-list', this);
  },
  {
    update: function(listModel) {
      artjs.Element.setVisible(this._element, artjs.Array.isNotEmpty(listModel.items));
    }
  },
  {
    _name: 'art.view.Main'
  },
  artjs.View
);
