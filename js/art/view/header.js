art.view.Header = artjs.Class(
	function(element) {
		this.super(element);

		this._register({
			'todo-list': '_onTodoListLoad'
		});
	},
	{
		_onTodoListLoad: function(todoList) {
			todoList.getModel().items = art.service.db.items;
		}
	},
	{
		_name: 'art.view.Header'
	},
	artjs.Component
);
