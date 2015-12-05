art.view.Count = artjs.Class(
  function(element) {
    this.super(element);

    var model = new artjs.Model();

    model.addProperty('n');

    this.setModel(model);

    this._listWatcher = new art.service.ListWatcher('todo-list', this);
  },
  {
    onListUpdate: function(listModel) {
      var items = listModel.items;
      var total = items.length;
      var completed = artjs.Array.select(artjs.Array.pluck(items, 'completed')).length;

      this._model.n = total - completed;
    }
  },
  {
    _name: 'art.view.Count'
  },
  artjs.TemplateView
);
