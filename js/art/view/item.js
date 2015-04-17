//These are here just to show the structure of the list items
//List items should get the class `editing` when editing and `completed` when marked as completed
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
		setModel: function(model) {
			this.super(model);

			this._model.addPropertyListener('completed', this._onCompletedChange.delegate);
			this._model.addPropertyListener('visible', this._onVisibleChange.delegate);
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
		},

		_onCompletedChange: function(data) {
			artjs.Element.setClass(this._element, this.ctor.COMPLETED_CLASS, data.newValue);
		},

		_onVisibleChange: function(data) {
			artjs.Element.setVisible(this._element, data.newValue);
		}
	},
	{
		EDITING_CLASS: 'editing',
		COMPLETED_CLASS: 'completed',

		_name: 'art.view.Item'
	},
	artjs.TemplateView
);
