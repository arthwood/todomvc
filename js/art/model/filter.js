art.model.Filter = artjs.Class(
  function(path, title) {
    this.super();

    this.addProperties({
      path: path,
      title: title
    });
  },
  null,
  {
    _name: 'art.model.Filter',

    toString: function() {
      return this._name;
    }
  },
  artjs.Model
);
