Template.memberList.helpers({
  'bool2String':function(e){
    if(e){
      return 'True';
    }else {
      return 'False';
    }
  }
});

Template.memberList.events({
  'click #selectToggle':function(){
    if(!Session.get("selectToggle")){
      Session.set("selectToggle", true);
    }else{
      Session.set("selectToggle", false);
    }
    $('input[type=checkbox]').each(function() {
      $(this).prop('checked', Session.get("selectToggle"));
    });
  },
  'click #slack':function(){
    Meteor.call('updateSlack');
  },
  'click #updateSwipe':function(){
    //Get val from select
    var val = $('#swipeChange').val();
    console.log(val);
    var emailStr = "";
    if(val.length != 0){
      $("input:checked").each(function () {
          //id is member id
          var id = $(this).attr("id");
          //Update Database
          Meteor.call('updateSwipe', id, val);

          //If we have to send an email
          if(val == "Pending"){
            var m = Members.findOne({_id:id});
            var str = ""
            str = str.concat(m.firstName, " ", m.lastName, " ", m.uID, "\n");
            console.log(str);
            emailStr = emailStr.concat(str);
          }
      });
      if(val == "Pending"){
        console.log("Email");
        console.log(emailStr);
        Meteor.call('sendEmail', 'jmr8893@rit.edu', 'sgweb@rit.edu', 'Swipe Access', emailStr);
      }
    }else{
      console.log("No Update to Users");
    }

  }
});

Template.memberList.rendered = function(){
  Session.set("selectToggle", false);
};
