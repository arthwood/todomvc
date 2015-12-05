artjs.TemplateLibrary.config.BASE_TEMPLATES = [];
artjs.TemplateLibrary.config.PATH = 'templates';
artjs.TemplateLibrary.config.TEMPLATES.push('item', 'filter');

window.art = {
  controller: {},
  model: {},
  service: {},
  view: {}
};
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
art.model.Filter = artjs.Class(
  function(path, title) {
    this.super();

    this.addProperties({
      path: path,
      title: title
    });
  },
  null,
  {
    _name: 'art.model.Filter',

    toString: function() {
      return this._name;
    }
  },
  artjs.Model
);
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
    _name: 'art.model.Item',

    fromJson: function(data) {
      return new this(data.title, Boolean(data.completed));
    },

    fromArray: function(data) {
      return artjs.Array.map(data, this.fromJson, this);
    },

    toString: function() {
      return this._name;
    }
  },
  artjs.Model
);
art.service.db = {
  items: [
    {title: 'Taste JavaScript'},
    {title: 'Buy a unicorn'}
  ]
};
art.service.ListWatcher = artjs.Class(
  function(listId, updateable) {
    this._listId = listId;
    this._updateable = updateable;
    
    artjs.Component.onLoad(this._listId, artjs.$D(this, '_onListLoad'));
  },
  {
    toString: function() {
      return this.ctor.toString + ' - listId: ' + this._listId + ', updateable: ' + this._updateable.toString();
    },
    
    _onListLoad: function(list) {
      var onUpdateDelegate = artjs.$D(this, '_onListUpdate');
      
      this._listModel = list.getModel();
      this._listModel.onItemAdd.add(onUpdateDelegate);
      this._listModel.onItemRemove.add(onUpdateDelegate);
      this._listModel.onItemChange.add(onUpdateDelegate);
      this._listModel.addPropertyListener('items', onUpdateDelegate, true);
    },
    
    _onListUpdate: function() {
      this._updateable.onListUpdate(this._listModel);
    }
  },
  {
    _name: 'art.service.ListWatcher',
    
    toString: function() {
      return this._name;
    }
  }
);
art.view.ClearCompleted = artjs.Class(
  function(element) {
    this.super(element);

    this._listWatcher = new art.service.ListWatcher('todo-list', this);
  },
  {
    onListUpdate: function(listModel) {
      artjs.Element.setVisible(this._element, artjs.Array.any(artjs.Array.pluck(listModel.items, 'completed')));
    }
  },
  {
    _name: 'art.view.ClearCompleted'
  },
  artjs.Button
);
art.view.Complete = artjs.Class(
  function(element) {
    this.super(element);

    this._handleBroadcast('Item::Complete', '_onComplete');
  },
  {
    _onComplete: function(item) {
      this.setChecked(item.getModel().completed);
    }
  },
  null,
  artjs.CheckBox
);
art.view.Count = artjs.Class(
  function(element) {
    this.super(element);

    var model = new artjs.Model();

    model.addProperty('n');

    this.setModel(model);

    this._listWatcher = new art.service.ListWatcher('todo-list', this);
  },
  {
    onListUpdate: function(listModel) {
      var items = listModel.items;
      var total = items.length;
      var completed = artjs.Array.select(artjs.Array.pluck(items, 'completed')).length;

      this._model.n = total - completed;
    }
  },
  {
    _name: 'art.view.Count'
  },
  artjs.TemplateView
);
art.view.Edit = artjs.Class(
  function(element) {
    this.super(element);

    artjs.on('blur', element, artjs.$D(this, '_onBlur'));
    artjs.on('keydown', element, artjs.$D(this, '_onEnter'), 13);

    this._handleBroadcast('Item::Edit', '_onEdit');
  },
  {
    _onEdit: function(item) {
      this.setValue(item.getModel().value);

      this._element.focus();
    },

    _onBlur: function() {
      this._save();
    },

    _onEnter: function() {
      this._save();
    },

    _save: function() {
      this._fire('Item::Save');
    }
  },
  {
    _name: 'art.view.Edit'
  },
  artjs.Text
);
art.view.Filter = artjs.Class(
  function(element) {
    this.super(element);

    artjs.Broadcaster.addListener('Filter', artjs.$D(this, '_onFilter'));
  },
  {
    _onClick: function(e, ee) {
      this.super(e, ee);

      this._toggle();
    },

    _onFilter: function(id) {
      if (this.getHref() == ('#/' + id)) {
        this._toggle();
      }
    },

    _toggle: function() {
      this.ctor.toggler.toggle(this._element);
    }
  },
  {
    _name: 'art.view.Filter',

    toggler: new artjs.ClassToggler('selected')
  },
  artjs.Link
);
art.view.Filters = artjs.Class(
  function(element) {
    this.super(element);

    this._model.items = [
      new art.model.Filter('', 'All'),
      new art.model.Filter('active', 'Active'),
      new art.model.Filter('completed', 'Completed')
    ];
  },
  null,
  {
    _name: 'art.view.Filters'
  },
  artjs.ListView
);
art.view.Footer = artjs.Class(
  function(element) {
    this.super(element);

    this._listWatcher = new art.service.ListWatcher('todo-list', this);
  },
  {
    onListUpdate: function(listModel) {
      artjs.Element.setVisible(this._element, artjs.Array.isNotEmpty(listModel.items));
    }
  },
  {
    _name: 'art.view.Footer'
  },
  artjs.Component
);
art.view.Item = artjs.Class(
  function(element) {
    this.super(element);

    this._handleEmit('Item::DblClick', '_onEdit');
    this._handleEmit('Item::Save', '_onSave');
    this._handleEmit('Item::Button::Delete', '_onDelete');
    this._handleEmit('Item::Complete', '_onComplete');

    this._editing = false;
  },
  {
    _onModelChange: function() {
      artjs.Element.setClass(this._element, this.ctor.COMPLETED_CLASS, this._model.completed);
      artjs.Element.setVisible(this._element, this._model.visible);

      this._fire('Item::Complete');
      this._fire('Item::Save');
    },

    _onEdit: function() {
      if (!this._editing) {
        this._editing = true;

        artjs.Element.addClass(this._element, this.ctor.EDITING_CLASS);

        this._fire('Item::Edit');
      }
    },

    _onDelete: function() {
      this._fire('Item::Delete');
    },

    _onSave: function(item) {
      this._editing = false;

      var value = artjs.String.trim(item.getValue());

      artjs.Element.removeClass(this._element, this.ctor.EDITING_CLASS);

      if (artjs.String.isPresent(value)) {
        this._model.value = value;
      }
    },

    _onComplete: function(checkbox) {
      this._model.completed = checkbox.isChecked();
    }
  },
  {
    EDITING_CLASS: 'editing',
    COMPLETED_CLASS: 'completed',

    _name: 'art.view.Item'
  },
  artjs.TemplateView
);
art.view.ItemLabel = artjs.Class(
  function(element) {
    this.super(element);

    artjs.on('dblclick', element, artjs.$D(this, '_onDblClick'));

    this._handleBroadcast('Item::Save', '_onSave');
  },
  {
    _onDblClick: function() {
      this._fire('Item::DblClick');
    },

    _onSave: function(item) {
      artjs.Element.setContent(this._element, item.getModel().value);
    }
  },
  {
    _name: 'art.view.ItemLabel'
  },
  artjs.Component
);
art.view.List = artjs.Class(
  function(element) {
    this.super(element);
    
    this._localStorage = new artjs.LocalStorage('todos-artjs');
    this._listWatcher = new art.service.ListWatcher('todo-list', this);
    this._model.onItemAdd.add(artjs.$D(this, '_onItemAdd'));
    this._model.onItemChange.add(artjs.$D(this, '_onItemChange'));
    artjs.Broadcaster.addListener('Filter', artjs.$D(this, '_onFilter'));
    
    this._handle('Todo::New', '_onNew');
    this._handle('MarkAllComplete', '_onMarkAllComplete');
    this._handle('ClearCompleted', '_onClearCompleted');
    this._handleEmit('Item::Delete', '_onDelete');
    
    var items = this._localStorage.getItem('items');
    
    this._model.items = art.model.Item.fromArray(!items || artjs.Array.isEmpty(items) ? art.service.db.items : items);
  },
  {
    _onNew: function(text) {
      var value = text.getValue();
      
      this._model.addItem(new art.model.Item(value));
    },
    
    _onDelete: function(item) {
      this._model.removeItem(item.getModel());
    },
  
    onListUpdate: function() {
      var items = this._model.items;
      
      if (!artjs.Object.isNull(items)) {
        items = artjs.Array.invoke(items, 'toJson');
      }
      
      this._localStorage.setItem('items', items);
    },
    
    _onMarkAllComplete: function(checkbox) {
      this._allComplete = checkbox.isChecked();
      
      artjs.Array.each(this._model.items, this._markAsComplete, this);
    },
    
    _onClearCompleted: function() {
      this.removeItems(artjs.Array.select(this._model.items, this._isCompleted, this));
    },
    
    _markAsComplete: function(item) {
      item.completed = this._allComplete;
    },
    
    _isCompleted: function(item) {
      return item.completed;
    },
    
    _isActive: function(item) {
      return !item.completed;
    },
    
    _true: function() {
      return true;
    },
    
    _onItemChange: function(model, item, property) {
      if (property == 'completed') {
        this._setItemVisibility(item);
      }
    },
    
    _onItemAdd: function(model, item) {
      this._setItemVisibility(item);
    },
    
    _onFilter: function(id) {
      this._visibilityStrategy = this.ctor.VISIBILITY_STRATEGIES[id] || '_true';
      this._filter();
    },
    
    _filter: function() {
      artjs.Array.each(this._model.items, this._setItemVisibility, this);
    },
    
    _setItemVisibility: function(item) {
      item.visible = this[this._visibilityStrategy](item);
    }
  },
  {
    _name: 'art.view.List',
    
    VISIBILITY_STRATEGIES: {
      completed: '_isCompleted',
      active: '_isActive'
    }
  },
  artjs.ListView
);
art.view.MarkAllComplete = artjs.Class(
  function(element) {
    this.super(element);

    this._listWatcher = new art.service.ListWatcher('todo-list', this);
  },
  {
    onListUpdate: function(listModel) {
      var pluck = artjs.Array.pluck(listModel.items, 'completed');

      this.setChecked(artjs.Array.all(pluck));
    }
  },
  {
    _name: 'art.view.MarkAllComplete'
  },
  artjs.CheckBox
);
art.view.Main = artjs.Class(
  function(element) {
    this.super(element);

    this._listWatcher = new art.service.ListWatcher('todo-list', this);
  },
  {
    onListUpdate: function(listModel) {
      artjs.Element.setVisible(this._element, artjs.Array.isNotEmpty(listModel.items));
    }
  },
  {
    _name: 'art.view.Main'
  },
  artjs.View
);
art.view.New = artjs.Class(
  function(element) {
    this.super(element);

    artjs.on('keydown', element, artjs.$D(this, '_onEnter'), 13);
  },
  {
    _onEnter: function() {
      var value = artjs.String.trim(this.getValue());

      if (!artjs.String.isEmpty(value)) {
        this._fire('Todo::New');
        this.clear();
      }
    }
  },
  {
    _name: 'art.view.New'
  },
  artjs.Text
);
