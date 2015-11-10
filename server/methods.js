Meteor.methods({
  updateSwipe: function(id, val){
    if(this.userId && Roles.userIsInRole(this.userId, ['admin'])){
      Members.update(id, {$set: {swipeAccess: val}});
    }
  },
  sendEmail: function (to, from, subject, text) {
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    if(this.userId && Roles.userIsInRole(this.userId, ['admin'])){
      Email.send({
        to: to,
        from: from,
        subject: subject,
        text: text
      });
    }

  }
});
