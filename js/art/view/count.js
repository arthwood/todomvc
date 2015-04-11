art.view.Count = artjs.Class(
	function(element) {
		this.super(element);

		this._model.addProperty('n');

		this._register({
			'todo-list': '_onTodoListLoad'
		});
	},
	{
		_onTodoListLoad: function(todoList) {
			todoList.getModel().addPropertyListener('items', this._onItemsChange.delegate);
		},

		_onItemsChange: function(values) {
			this._model.n = values.newValue.length;
		}
	},
	{
		_name: 'art.view.Count'
	},
	artjs.TemplateView
);
