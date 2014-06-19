describe('PlayerView', function() {
  var library, appView;

  beforeEach(function() {

    library = new Songs([
      {
        url: "mp3s/08 4 Page Letter.mp3",
        title: "4 Page Letter",
        artist: "Aaliyah"
      },
      {
        url: "mp3s/11 We Need A Resolution.mp3",
        title: "We Need A Resolution",
        artist: "Aaliyah"
      },
      {
        url: "mp3s/A Third Song.mp3",
        title: "The Third Song",
        artist: "Aaliyah"
      },
    ]);
    // playerView is created in AppView initialize
    // access with appView.playerView
    appView = new AppView({model: new AppModel({library: library})});
  });

  it('gets its model property set to any song that is played', function(){
    var song = library.at(0);
    expect(appView.playerView.model).to.not.equal(song);
    appView.model.get('songQueue').addToQueue(song);
    song.play();
    expect(appView.playerView.model).to.equal(song);
  });

  describe('Song transitions', function() {
    it('dequeues a song when finished playing & plays the next song', function(){
      var firstSong = library.at(0)
        , secondSong = library.at(1)
        , thirdSong = library.at(2)
        , songQueue = appView.model.get('songQueue');
      // Set up a queue of three songs
      songQueue.addToQueue(firstSong);
      songQueue.addToQueue(secondSong);
      songQueue.addToQueue(thirdSong);
      // play the first song
      songQueue.playFirst();
      expect(appView.playerView.model).to.equal(firstSong);
      console.log('passed first test');
      // Simulate the end of the first song
      $(appView.playerView.el).trigger('ended');
      expect(appView.playerView.model).to.equal(secondSong);
      console.log('passed second test');
      // Simulate the end of the second song
      $(appView.playerView.el).trigger('ended');
      expect(appView.playerView.model).to.equal(thirdSong);
      console.log('passed third test');
    });
  });

});
