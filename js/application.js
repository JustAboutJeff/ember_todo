window.App = Ember.Application.create({});

// === ROUTES ===
App.Router.map(function() {
  this.resource('todos', { path: '/' });
});

App.TodosRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('todo');
  }
});

// === CONTROLLERS ===
App.TodosController = Ember.ArrayController.extend({

  remaining: function() {
    return this.filterBy('isDone', false).get('length');
  }.property('@each.isDone'),

  inflection: function() {
    return this.get('remaining') === 1 ? 'item' : 'items';
  }.property('remaining'),

  actions: {
    createTodo: function() {
      var title = this.get('newTitle');
      if (!title.trim()) { return; }
      var todo = this.store.createRecord('todo', {
        title: title,
        isDone: false
      });
      this.set('newTitle', '');
      todo.save();
    }
  }
});

App.TodoController = Ember.ObjectController.extend({

  isEditing: false,

  isDone: function(key, value){
    var model = this.get('model');

    if (value === undefined) {
      return model.get('isDone');
    } else {
      model.set('isDone', value);
      model.save();
      return value;
    }
  }.property('model.isDone'),

  actions: {
    editTodo: function() {
      this.set('isEditing', true);
    },

    acceptChanges: function() {
      this.set('isEditing', false);
      if (Ember.isEmpty(this.get('model.title'))) {
        this.send('removeTodo');
      } else {
        this.get('model').save();
      }
    }
  }
});

// === VIEWS ===
App.EditTodoView = Ember.TextField.extend({
  didInsertElement: function() {
    this.$().focus();
  }
});

// === HELPERS ===
Ember.Handlebars.helper('edit-todo', App.EditTodoView);

// === MODELS ===
App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Todo = DS.Model.extend({
  title: DS.attr('string'),
  isDone: DS.attr('boolean')
});

App.Todo.FIXTURES = [
 {
   id: 1,
   title: 'In a cocktail shaker, add 1.5oz. light rum',
   isDone: true
 },
 {
   id: 2,
   title: 'Add 0.75oz. fresh lime juice',
   isDone: false
 },
 {
   id: 3,
   title: 'Add 1.25oz. simple syrup',
   isDone: false
 },
 {
   id: 4,
   title: 'Add 3oz. crushed ice',
   isDone: false
 },
 {
   id: 5,
   title: 'Shake well for 5 seconds',
   isDone: false
 },
 {
   id: 6,
   title: 'Pour strained into a chilled cocktail glass',
   isDone: false
 },
 {
   id: 7,
   title: 'Okole maluna!',
   isDone: false
 }
];
