Template.navbar.events({
  'click #logout-button':function(e){
    e.preventDefault();
    Meteor.logout();
  }
})
