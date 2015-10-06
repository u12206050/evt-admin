Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function routerMap() {
    this.route('index', {
        path: '/',
        template: 'adminPage',
        waitOn: function() {
            return [Meteor.subscribe('members')];
        },
        data: function() {
            return {
                members: Members.find().fetch()
            };
    }
    });
});
