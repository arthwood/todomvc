art.view.Complete = artjs.Class(
	function(element) {
		this.super(element);

		this._handleBroadcast('Item::Complete', '_onComplete');
	},
	{
		_onComplete: function(item) {
			this.setChecked(item.getModel().completed);
		}
	},
	null,
	artjs.CheckBox
);
