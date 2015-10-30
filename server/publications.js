Meteor.publish('members', function () {
  if (this.userId && Roles.userIsInRole(this.userId, ['admin'])) {
    return Members.find();
  }
});

Metoer.publish('member', function(username) {
  return Members.find({username:username},{});
});

Meteor.publish("userData", function () {
     return Meteor.users.find({_id: this.userId}, {fields: {'displayName': 1}});
});
