Meteor.publish("chats", function() {
  return Chats.find({
    $or: [{
      user1Id: this.userId
    }, {
      user2Id: this.userId
    }]
  });

});
Meteor.publish("usersList", function(){
  return Meteor.users.find();
});
Meteor.publish('emojis', function() {
  return Emojis.find();
});

Meteor.methods({
  addMessage: function(chatId, text) {
    if (!this.userId) {
      return;
    } else {
      var chat = Chats.findOne({
        _id: chatId
      });
      if (chat) {
        var msgs = chat.messages;
        if (!msgs) { // no messages yet, create a new array
          msgs = [];
        }
        msgs.push({
          text: text,
          userId: this.userId
        });
        chat.messages = msgs;
        Chats.update(chat._id, chat);
      }
    }
  },
  getChat: function(otherUserId) {
    var filter = {$or:[
                {user1Id:Meteor.userId(), user2Id:otherUserId},
                {user2Id:Meteor.userId(), user1Id:otherUserId}
                ]};
    var chat = Chats.findOne(filter);
    if (!chat){// no chat matching the filter - need to insert a new one
      chatId = Chats.insert({user1Id:Meteor.userId(), user2Id:otherUserId});
    }
    else {// there is a chat going already - use that.
      chatId = chat._id;
    }
    return chatId;
  }
});
