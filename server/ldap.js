var assert, ldap, Future, LDAP;

ldap = Meteor.npmRequire('ldapjs');
assert = Npm.require('assert');
Future = Npm.require('fibers/future');

LDAP = {};
LDAP.searchOu = 'ou=People,dc=rit,dc=edu';
LDAP.searchQuery = function(user){
  return {
    filter: "(uid=" + user + ")",
    scope: 'sub'
  };
};

LDAP.checkAccount = function(options) {
  var dn, future;
  LDAP.client = ldap.createClient({
    url: "ldaps://ldap.rit.edu",
    maxConnections: 2,
    bindDN:          'uid=' + options.username + ',ou=People,dc=rit,dc=edu',
    bindCredentials: options.password
  });
  options = options || {};
  dn = [];
  future = new Future();
  if (options.password.length === 0 || options.username.length === 0) {
    future['return'](void 8);
    return;
  }
  LDAP.client.search(LDAP.searchOu, LDAP.searchQuery(options.username), function(err, search) {
    if (err) {
      future['return'](false);
      return false;
    } else {
      search.on('searchEntry', function(entry) {
        dn.push(entry.objectName);
        console.log(entry.object);
        LDAP.displayName = entry.object.displayName;
        return LDAP.displayName = entry.object.displayName;
      });
      search.on('error', function(err){
        throw new Meteor.Error(500, "LDAP server error");
      });
      return search.on('end', function() {
        if (dn.length === 0) {
          future['return'](false);
          return false;
        }
        return LDAP.client.bind(dn[0], options.password, function(err) {
          if (err) {
            future['return'](false);
            return false;
          }
          return LDAP.client.unbind(function(err) {
            assert.ifError(err);
            return future['return'](!err);
          });
        });
      });
    }
  });
  return future.wait();
};

Accounts.registerLoginHandler('ldap', function(loginRequest) {
  var user, userId, profile;
  if (LDAP.checkAccount(loginRequest)) {
    user = Meteor.users.findOne({
      username: loginRequest.username.trim().toLowerCase()
    });
    if (user) {
      userId = user._id;
      Meteor.users.update(userId, {$set: {displayName: LDAP.displayName}});
    } else {
      userId = Meteor.users.insert({
        username: loginRequest.username.trim().toLowerCase(),
        displayName: LDAP.displayName
      });
    }
    return {
      userId: userId
    };
  }
});
