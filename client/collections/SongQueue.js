// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Songs.extend({

  initialize: function(){
    this.add(new SongModel());
    this.on('ended', function(){
      this.shift();
      this.playFirst();
    }, this);
  },

  playFirst: function(){
    this.at('0').play();

  },

  addToQueue: function(song){
    if (this.at('0').get('url') === undefined) {
      this.set([song]);
      this.playFirst();
    }else{
      this.add(song);
    }
  }

});
