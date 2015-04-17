art.model.Item = artjs.Class(
	function(value, completed) {
		this.super();

		this.addProperties({value: value, completed: Boolean(completed), visible: true});
	},
	null,
	null,
	artjs.ListItemModel
);
