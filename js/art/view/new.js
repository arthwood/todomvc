art.view.New = artjs.Class(
  function(element) {
    this.super(element);

    artjs.on('keydown', element, artjs.$D(this, '_onEnter'), 13);
  },
  {
    _onEnter: function() {
      var value = artjs.String.trim(this.getValue());

      if (!artjs.String.isEmpty(value)) {
        this._fire('Todo::New');
        this.clear();
      }
    }
  },
  {
    _name: 'art.view.New'
  },
  artjs.Text
);
