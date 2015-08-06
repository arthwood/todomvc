spec(art.model.Item, function() {
  describe('constructor', function() {
    it('should construct new item', function() {
      var value = 'My Item';
      var completed = true;
      var item = new (subject())(value, completed);

      expect(item.value).to(eq(value));
      expect(item.completed).to(eq(completed));
      expect(item.visible).to(beTrue());
    });
  });

  describe('#toJson', function() {
    it('should return valid object', function() {
      var value = 'My Item';
      var completed = true;
      var item = new (subject())(value, completed);
      var result = item.toJson();

      expect(artjs.Object.keys(result)).to(eq(['title', 'completed']));
      expect(result.title).to(eq(value));
      expect(result.completed).to(eq(completed));
    });
  });

  describe('.fromJson', function() {
    it('should return new item', function() {
      var data = {title: 'My Item'};
      var item = subject().fromJson(data);

      expect(item.value).to(eq(data.title));
      expect(item.completed).to(beFalse());
      expect(item.visible).to(beTrue());
    });
  });

  describe('.fromArray', function() {
    it('should return array of new items', function() {
      var data = {title: 'My Item'};
      var items = subject().fromArray([data]);
      var item = artjs.Array.first(items);

      expect(items.length).to(eq(1));
      expect(item.value).to(eq(data.title));
      expect(item.completed).to(beFalse());
      expect(item.visible).to(beTrue());
    });
  });
});
