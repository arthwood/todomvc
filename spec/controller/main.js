spec(new art.controller.Main(), function() {
	describe('index', function() {
		it("should broadcast 'Filter'", function() {
			var param = 'active';

			expect(artjs.Broadcaster).to(receive('fire')).withArgs('Filter', param);

			subject().index(param);
		});
	});
});
