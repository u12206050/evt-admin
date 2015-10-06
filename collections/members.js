Members = new Mongo.collection('members');
Members.attachSchema(new SimpleSchema({
  firstName: {
    type: String,
    label: "FirstName",
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
          return content.value + "@rit.edu";
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
    type: Number,
    label: "University ID #",
    max: 9
  },
  swipeAccess: {
    type: Boolean,
    label: "Swipe",
    autoform: {
      omit: true
    },
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
