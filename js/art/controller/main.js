art.controller.Main = artjs.Class(
  null,
  {
    index: function(request) {
      artjs.Broadcaster.fire('Filter', request.controllerId);
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
  },
  artjs.Controller
);

artjs.Router.defaultController = new art.controller.Main();
