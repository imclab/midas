define([
  'jquery',
  'underscore',
  'backbone',
  'utilities',
  'nav_view',
  'browse_list_controller',
  'project_model',
  'project_show_controller',
  'profile_show_controller',
  'task_model',
  'task_item_view'
], function ($, _, Backbone, utils, NavView, BrowseListController, ProjectModel, ProjectShowController, ProfileShowController, TaskModel, TaskItemView) {

  var BrowseRouter = Backbone.Router.extend({

    routes: {
      ''                          : 'redirectHome',
      'projects(/)'               : 'listProjects',
      'projects/:id(/)'           : 'showProject',
      'tasks(/)'                  : 'listTasks',
      'tasks/:id(/)'              : 'showTask',
      'profile(/)'                : 'showProfile',
      'profile/:id(/)'            : 'showProfile'
    },

    data: { saved: false },

    initialize: function () {
      this.navView = new NavView({
        el: '.navigation'
      }).render();
    },

    cleanupChildren: function () {
      if (this.browseListController) { this.browseListController.cleanup(); }
      if (this.projectShowController) { this.projectShowController.cleanup(); }
      if (this.profileShowController) { this.profileShowController.cleanup(); }
      if (this.taskItemView) { this.taskItemView.cleanup(); }
      this.data = { saved: false };
    },

    redirectHome: function () {
      Backbone.history.navigate('/projects', { trigger: true });
    },

    listProjects: function () {
      this.cleanupChildren();
      this.browseListController = new BrowseListController({
        target: 'projects',
        data: this.data
      });
    },

    listTasks: function () {
      this.cleanupChildren();
      this.browseListController = new BrowseListController({
        target: 'tasks',
        data: this.data
      });
    },

    showProject: function (id) {
      this.cleanupChildren();
      var model = new ProjectModel();
      model.set({ id: id });
      this.projectShowController = new ProjectShowController({ model: model, router: this });
    },

    showTask: function (id) {
      this.cleanupChildren();
      var model = new TaskModel();
      this.taskItemView = new TaskItemView({ model: model, router: this, id: id });
    },

    showProfile: function (id) {
      this.cleanupChildren();
      this.profileShowController = new ProfileShowController({ id: id, data: this.data });
    }

  });

  var initialize = function () {
    var router = new BrowseRouter();
    return router;
  }

  return {
    initialize: initialize
  };
});