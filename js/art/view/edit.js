art.view.Edit = artjs.Class(
  function(element) {
    this.super(element);

    artjs.on('blur', element, artjs.$D(this, '_onBlur'));
    artjs.on('keydown', element, artjs.$D(this, '_onEnter'), 13);

    this._handleBroadcast('Item::Edit', '_onEdit');
  },
  {
    _onEdit: function(item) {
      this.setValue(item.getModel().value);

      this._element.focus();
    },

    _onBlur: function() {
      this._save();
    },

    _onEnter: function() {
      this._save();
    },

    _save: function() {
      this._fire('Item::Save');
    }
  },
  {
    _name: 'art.view.Edit'
  },
  artjs.Text
);
