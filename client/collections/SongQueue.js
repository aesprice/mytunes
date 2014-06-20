// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Songs.extend({

  initialize: function(){
    this.on('ended dequeue', this.removeFromQueue, this);
  },

  playFirst: function(){
    this.at('0').play();
  },

  addToQueue: function(song){
    if (this.at('0') === undefined) {
      this.add(song.toJSON());
      this.playFirst();
    }else{
      this.add(song.toJSON());
    }
  },

  removeFromQueue: function(){
    this.shift();
    if (this.length){
      this.playFirst();
    }
  }

});
