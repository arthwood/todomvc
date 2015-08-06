art.view.Item = artjs.Class(
  function(element) {
    this.super(element);

    this._handleEmit('Item::DblClick', '_onEdit');
    this._handleEmit('Item::Save', '_onSave');
    this._handleEmit('Item::Button::Delete', '_onDelete');
    this._handleEmit('Item::Complete', '_onComplete');

    this._editing = false;
  },
  {
    _onModelChange: function() {
      artjs.Element.setClass(this._element, this.ctor.COMPLETED_CLASS, this._model.completed);
      artjs.Element.setVisible(this._element, this._model.visible);

      this._fire('Item::Complete');
      this._fire('Item::Save');
    },

    _onEdit: function() {
      if (!this._editing) {
        this._editing = true;

        artjs.Element.addClass(this._element, this.ctor.EDITING_CLASS);

        this._fire('Item::Edit');
      }
    },

    _onDelete: function() {
      this._fire('Item::Delete');
    },

    _onSave: function(item) {
      this._editing = false;

      var value = artjs.String.trim(item.getValue());

      artjs.Element.removeClass(this._element, this.ctor.EDITING_CLASS);

      if (artjs.String.isPresent(value)) {
        this._model.value = value;
      }
    },

    _onComplete: function(checkbox) {
      this._model.completed = checkbox.isChecked();
    }
  },
  {
    EDITING_CLASS: 'editing',
    COMPLETED_CLASS: 'completed',

    _name: 'art.view.Item'
  },
  artjs.TemplateView
);
