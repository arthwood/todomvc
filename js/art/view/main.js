art.view.Main = artjs.Class(
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
		toString: function() {
			return 'art.view.Main';
		}
	},
	artjs.Component
);
