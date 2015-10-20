Meteor.publish('members', function () {
  return Members.find();
});

Meteor.publish("userData", function () {
     return Meteor.users.find({_id: this.userId}, {fields: {'displayName': 1}});
});
