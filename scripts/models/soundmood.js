'use strict';

// var __API_URL__ = 'https://rainy-day-v2.herokuapp.com'
// var __API_URL__ = 'https://localhost:3000'


(function(module) {
    let soundmood = {};
    
    function Song(rawDataObj) {
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.URL = URL;
    }

    function Ambiance(rawDataObj) {
        this.id = id;
        this.name = name;
        this.URL = URL;
    }

    function Video(rawDataObject) {
        this.id = id;
        this.name = name;
        this.URL = URL;
    }

    // gonna need to create an object constructor which will put playlist objects in this array so that they can be called by the playlistView.init function
    // TODO: should probably only be triggered when the /playlist route is hit??? don't need it every time
    let presetPlaylists = [];

    // array full of objects housing respective data, initialized on page load
    Song.all = [];
    Ambiance.all = [];
    Video.all = [];

    // TODO: instantiate this
    // soundmood.prototype.playlistPreviewToHtml = function () {
    //     var template = Handlebars.compile($('#preset-playlist-template').text());
    //     return template(this);
    // };

    Song.loadAll = rawData => {
        // TODO: double check how the data object comes back from mongo... rawData.rows may not work. might need to be just rawData
        // this sorts the song objects by ID so that when we reference them in the array the index *SHOULD* only be one off from the ID
        rawData.rows.sort((a, b) => {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;
            return 0;
        }); 

        // TODO: again, double check that data comes back as rows
        Song.all = rawData.rows.map((songObj) => new Song(songObj));
    }

    Ambiance.loadAll = rawData => {
        rawData.rows.sort((a, b) => {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;
            return 0;
        });

        Ambiance.all = rawData.rows.map((ambianceObj) => new Ambiance(ambianceObj));
    }

    Video.loadAll = rawData => {
        rawData.rows.sort((a, b) => {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;
            return 0;
        });

        Video.all = rawData.rows.map((videoObj) => new Video(videoObj));
    }



    soundmood.fetchAll = function () {
        Song.fetchAll();
        Ambiance.fetchAll();
        Video.fetchAll();
    }

    //###################################################################################

    var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        var player1;
        var player2;
        var player3;
        function onYouTubeIframeAPIReady() {
            player1 = new YT.Player('player1', {
                                  
                                  videoId: 'VhQWF-H6eNU',
                                  playerVars: { 'rel': 0, 'showinfo': 0, 'loop': 1, 'autoplay': 1, 'controls': 0 },
                                  events: {
                                        'onReady': onPlayer1Ready,
                                        'onStateChange': onPlayer1StateChange
                                  }
                             });
            player2 = new YT.Player('player2', {
                                  
                                  videoId: 'q76bMs-NwRk',
                                  playerVars: { 'rel': 0, 'showinfo': 0, 'loop': 1, 'autoplay': 1, 'controls': 0 },
                                  events: {
                                       'onReady': onPlayer2Ready,
                                       //'onStateChange': onPlayer2StateChange
                                  }
                              });
            player3 = new YT.Player('player3', {
                                  videoId: 'n0svuurLibQ',
                                  playerVars: { 'rel': 0, 'showinfo': 0, 'loop': 1, 'autoplay': 1, 'controls': 0 },
                                  events: {
                                    'onReady': onPlayer3Ready,
                                  }
                                  
                                  



            })
        }

        function onPlayer1Ready() {
          player1.setVolume(0);

        }

        function onPlayer2Ready() {
          player2.setVolume(100);
        }

        function onPlayer3Ready() {
          player3.setVolume(90);
        }

        function onPlayer1StateChange() {
          if(player2.getPlayerState() == '1') {
            player2.pauseVideo();
          } else if(player2.getPlayerState() == '2') {
            player2.playVideo();
          }

          if(player3.getPlayerState() == '1') {
            player3.pauseVideo();
          } else if(player3.getPlayerState() == '2') {
            player3.playVideo();
          }
        }



    module.soundmood = soundmood;
})(window)
