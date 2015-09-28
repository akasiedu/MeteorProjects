PlayerList = new Mongo.Collection('players');


if (Meteor.isClient) {
 
  Meteor.subscribe('thePlayers')

  Template.leaderboard.helpers({
    player: function () {
      var currentUserId = Meteor.userId();
      return PlayerList.find({}, {sort: {score: -1, name: 1}});
    },

    'selectedClass': function(){
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if (playerId == selectedPlayer) {
        return "selected"
      }
    },

    'showSelectedPlayer': function(){
        var selectedPlayer = Session.get('selectedPlayer');
        return PlayerList.findOne(selectedPlayer)
      }
  })


  Template.addPlayerForm.events({
    'submit form': function (event) {
      event.preventDefault();

      var playerNameVar = event.target.playerName.value;
      Meteor.call('insertPlayerData', playerNameVar);
    }
  })


  Template.leaderboard.events({
    'click .player': function () {
     var playerId = this._id;
     Session.set('selectedPlayer', playerId);
    
    },
     'click .increment': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('modifyPlayerScore', selectedPlayer, 5);
    },
    'click .decrement': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('modifyPlayerScore', selectedPlayer, -5)
    },
    'click .remove':function(){
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('removePlayerData', selectedPlayer);
    }
  });

};





if (Meteor.isServer) {

  Meteor.publish('thePlayers', function(){
    var currentUserId = this.userId;
    return PlayerList.find({createdBy: currentUserId});
  }),
  
  Meteor.methods({
    'insertPlayerData': function(playerNameVar){
      var currentUserId = Meteor.userId();
      PlayerList.insert({
        name: playerayerNameVar,
        score: 0,
        createdBy: currentUserId
      })
    },

    'removePlayerData': function(selectedPlayer){
    PlayerList.remove(selectedPlayer);
  },


    'modifyPlayerScore':function(selectedPlayer, scoreValue){
      PlayerList.update(selectedPlayer, {$inc: {score: scoreValue} })
    }
  })
}