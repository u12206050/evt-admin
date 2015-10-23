
Template.memberList.helpers({
    swipeString: function (val) {
      if(val){
          return 'True';
      }else{
          return 'False';
      }
    }
});

Handlebars.registerHelper('isActiveRoute', function(route) {
  return routeUtils.testRoutes(route) ? 'active' : '';
});
