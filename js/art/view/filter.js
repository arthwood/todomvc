art.view.Filter = artjs.Class(
  function(element) {
    this.super(element);

    artjs.Broadcaster.addListener('Filter', artjs.$D(this, '_onFilter'));
  },
  {
    _onClick: function(e, ee) {
      this.super(e, ee);

      this._toggle();
    },

    _onFilter: function(id) {
      if (this.getHref() == ('#/' + id)) {
        this._toggle();
      }
    },

    _toggle: function() {
      this.ctor.toggler.toggle(this._element);
    }
  },
  {
    _name: 'art.view.Filter',

    toggler: new artjs.ClassToggler('selected')
  },
  artjs.Link
);
