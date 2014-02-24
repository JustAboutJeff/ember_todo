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
