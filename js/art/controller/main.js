art.controller.Main = artjs.Class(
	null,
	{
		index: function(id) {
			artjs.Broadcaster.fire('Filter', id);
		}
	}
);
