spec(art.service.ListWatcher, function() {
	it('should call update on listener for particular list events', function() {
		window.test = {
			View: new artjs.Class(null, null, null, artjs.ListView)
		};

		var listId = 'todo-list';
		var element = artjs.$E('ul', {id: listId});
		var updateable = mock('update');
		var watcher = new (subject())(listId, updateable);
		var view = artjs.ComponentScanner.instantiateClass('test-View', element);
		var model = view.getModel();

		expect(updateable).to(receive('update')).withArgs(model).times(4);

		var item = new artjs.Model();

		item.addProperty('id');

		model.addItem(item);
		item.id = 3;
		model.removeItem(item);
		model.items = [item];
	});
});
