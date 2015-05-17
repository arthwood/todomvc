art.view.Filters = artjs.Class(
	function(element) {
		this.super(element);

		this.setItems([
			new art.model.Filter('', 'All'),
			new art.model.Filter('active', 'Active'),
			new art.model.Filter('completed', 'Completed')
		]);
	},
	null,
	{
		_name: 'art.view.Filters'
	},
	artjs.ListView
);
