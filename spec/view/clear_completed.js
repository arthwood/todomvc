spec(art.view.ClearCompleted, function() {
  describe('#update', function() {
    it('should set visibility', function() {
      var model = {
        items: [
          {completed: false},
          {completed: true}
        ]
      };
      var element = artjs.$E('div');

      expect(artjs.Element).to(receive('setVisible')).withArgs(element, true);

      var instance = new art.view.ClearCompleted(element);

      instance.update(model);
    });
  });
});
