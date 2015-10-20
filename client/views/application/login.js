Meteor.ldapLogin = function (username, password, callback) {
  return Accounts.callLoginMethod({
    methodArguments: [{username: username, password: password}],
    userCallback: callback
  });
};

Template.login.events({
  'submit form': function(event, template) {
    Session.set('loginError', null);
    event.preventDefault();
    return Meteor.ldapLogin(template.find('#username').value, template.find('#password').value, function (err, user) {
      if (err) {
        console.log(err);
      } else {
        template.find('#username').value = "";
        template.find('#password').value = "";
        Router.go('/');
      }
      return;
    });
  }
});
