art.model.Item = artjs.Class(
	function(value, completed) {
		this.super();

		this.addProperties({value: value, completed: Boolean(completed), visible: true});
	},
	{
		toJson: function() {
			return {
				title: this.value,
				completed: this.completed
			}
		}
	},
	{
		fromJson: function(data) {
			return new this(data.title, Boolean(data.completed));
		},

		fromArray: function(data) {
			return artjs.Array.map(data, this.fromJson, this);
		}
	},
	artjs.Model
);
