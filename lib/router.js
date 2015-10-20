Router.configure({
  layoutTemplate: 'layout',
  waitOn: function () {
    return [Meteor.subscribe('userData')];
  },
  onBeforeAction: function () {
      if(Meteor.user()){
          if(Roles.userIsInRole(this.userId, ['admin'])){
            this.next();
          }else{
            this.next();
          }
      }else{
          this.render('login');
      }
  }
});

Router.map(function routerMap() {
    this.route('index', {
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
