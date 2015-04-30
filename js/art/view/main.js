art.view.Main = artjs.Class(
	function(element) {
		this.super(element);

		this._onItemsChangeDelegate = artjs.$D(this, '_onItemsChange');

		artjs.Component.onLoad('todo-list', artjs.$D(this, '_onListLoad'));
	},
	{
		_onListLoad: function(list) {
      list.getModel().addPropertyListener('items', this._onItemsChangeDelegate);
    },

		_onItemsChange: function(data) {
			artjs.Element.setVisible(this._element, artjs.Array.isNotEmpty(data.newValue));
		}
	},
	{
		_name: 'art.view.Main'
	},
	artjs.View
);
