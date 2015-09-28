Uploads = new FS.Collection('uploads', {
  stores:[new FS.Store.FileSystem('uploads', {path:'../projectUploads'})]
})
if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    },
    uploads: function(){
      return Uploads.find();
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    },
    'change .fileInput': function(event, template){
      FS.Utility.eachFile(event, function(file){
        var fileObj = new FS>File(file);
        Uploads.insert(fileObj, function(err){
          console.log(err);
        })
      })
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    
  });
}
