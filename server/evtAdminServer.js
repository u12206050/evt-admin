var adminList = ["wpl3499", "sgweb", "evt"];

for(var i = 0; i < adminList.length; i++){
  if (Meteor.users.find({username: adminList[i]}).count() === 0) {
    var sgwebId = Meteor.users.insert({
      username: adminList[i]
    });
    var admin = Meteor.users.findOne(sgwebId);
    Roles.addUsersToRoles(admin, ['admin']);
  }
}
