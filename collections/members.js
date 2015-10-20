Members = new Mongo.Collection('members');
Members.attachSchema(new SimpleSchema({
  firstName: {
    type: String,
    label: "First Name",
  },
  lastName: {
    type: String,
    label: "Last Name"
  },
  email: {
    type: String,
    label: "Email",
    autoform: {
      omit: true
    },
    autoValue: function() {
      if (this.isInsert) {
        var username = this.field("username");
        if (username.isSet) {
          return username.value + "@rit.edu";
        } else {
          this.unset();
        }
      }
    }
  },
  username: {
    type: String,
    label: "Username"
  },
  uID: {
    type: String,
    label: "University ID #",
    min: 9,
    max: 9
  },
  swipeAccess: {
    type: String,
    label: "Swipe",
    autoform: {
      omit: true
    },
    autoValue: function() {
      if (this.isInsert) {
        return "False";
      }
    }
  },
  slackAccess:{
    type: Boolean,
    label: "Slack",
    autoValue: function() {
      if (this.isInsert) {
        return false;
      }
    }
  },
  createdAt: {
    type: Date,
    autoform: {
      omit: true
    },
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date};
      } else {
        this.unset();
      }
    }
  }
}));
