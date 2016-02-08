Chats = new Mongo.Collection("chats");

Chats.allow({
  insert: function(userId, doc) {
    return true;
  },
  update: function(userId, doc) {
    return true;
  }
})
