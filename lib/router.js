Router.configure({
  layoutTemplate: 'layout',
  waitOn: function () {
    return [Meteor.subscribe('userData')];
  },
});

Router.map(function routerMap() {
    this.route('addMember', {
        path: '/',
        template: 'addMember'
    });
    this.route('memberList', {
        path: '/members',
        template: 'memberList',
        waitOn: function() {
            return [Meteor.subscribe('members')];
        },
        data: function() {
            return {
                members: Members.find().fetch()
            };
        }
    });
    this.route('login', {
        path: '/login',
        template: 'login'
    });
});
