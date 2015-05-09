art.controller.Main = artjs.Class(
	null,
	{
		index: function(id) {
			artjs.Broadcaster.fire('Filter', id);
		},

		toString: function() {
			return this.ctor.toString();
		}
	},
	{
		_name: 'art.controller.Main',

		toString: function() {
			return this._name;
		}
	}
);
