Meteor.subscribe("chats", Meteor.userId());
Meteor.subscribe("usersList");
Meteor.subscribe('emojis');
///
// helper functions
///
Template.available_user_list.helpers({
  users: function() {
    return Meteor.users.find();
  }
})
Template.available_user.helpers({
  getUsername: function(userId) {
    user = Meteor.users.findOne({
      _id: userId
    });
    return user.profile.username;
  },
  isMyUser: function(userId) {
    if (userId == Meteor.userId()) {
      return true;
    } else {
      return false;
    }
  }
})


Template.chat_page.helpers({
  messages: function() {
    var chat = Chats.findOne({
      _id: Session.get("chatId")
    });
    return chat.messages;
  },
  other_user: function() {
    return ""
  },

})

Template.chat_message.helpers({
  getAvatar: function(userId) {
    user = Meteor.users.findOne({
      _id: userId
    });
    return user.profile.avatar;
  },

  getUsername: function(userId) {
    user = Meteor.users.findOne({
      _id: userId
    });
    return user.profile.username;
  }
})

Template.chat_page.events({
  // this event fires when the user sends a message on the chat page
  'submit .js-send-chat': function(event) {
    // stop the form from triggering a page reload
    event.preventDefault();

    var chatId = Session.get("chatId");
    var text = event.target.chat.value;
    if(Meteor.user()) {
      Meteor.call("addMessage", chatId, text);
    }

  }
})
