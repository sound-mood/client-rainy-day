'use strict';

// var __API_URL__ = 'https://rainy-day-v2.herokuapp.com'
var __API_URL__ = 'http://localhost:3000';

(function(module) {
    let soundmood = {};
    
    function Song(rawDataObj) {
        Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
        
    }

    function Ambiance(rawDataObj) {
        Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
    }

    function Video(rawDataObj) {
        Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
    }

    //  THIS IS A TEST

    
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
        console.log(rawData);

        

        Song.all = rawData.map((songObj) => new Song(songObj));

        // TODO: add code so that if user_id is 0 or the individual's user_id then it appends certain songs
        Song.all.forEach(a => {
            console.log(a);
            $('#music-selection').append(a.songToHtml())
        });
    }

    Ambiance.loadAll = rawData => {
        Ambiance.all = rawData.map((ambianceObj) => new Ambiance(ambianceObj));

        // TODO: add code so that if user_id is 0 or the individual's user_id then it appends certain ambiances
        Ambiance.all.forEach(a => {
            // console.log(a);
            $('#sound-selection').append(a.ambianceToHtml())
        });

    }

    Video.loadAll = rawData => {
        Video.all = rawData.map((videoObj) => new Video(videoObj));
        // TODO: add code so that if user_id is 0 or the individual's user_id then it appends certain videos
        Video.all.forEach(a => {
            console.log(a);
            $('#video-selection').append(a.videoToHtml())
        });

    }
       
    // TODO: ask why didn't this work as a lexical arrow function
    Song.prototype.songToHtml = function() {
        console.log(this);
        let template = Handlebars.compile($('#song-choices-template').text());
        console.log(template(this));
        return template(this);
    }

    Ambiance.prototype.ambianceToHtml = function() {
        console.log(this);
        let template = Handlebars.compile($('#ambiance-choices-template').text());
        console.log(template(this));
        return template(this);
    }

    Video.prototype.videoToHtml = function() {
        console.log(this);
        let template = Handlebars.compile($('#video-choices-template').text());
        console.log(template(this));
        return template(this);
    }


    soundmood.fetchAll = function () {
        Song.fetchAll();
        Ambiance.fetchAll();
        Video.fetchAll();
    }

    Song.fetchAll = (callback) => {
        $.get(`${__API_URL__}/api/v1/songs`)
            .then(results => {
                Song.loadAll(results);
            })
            .then(callback)
    }


    Ambiance.fetchAll = (callback) => {
        $.get(`${__API_URL__}/api/v1/ambiance`)
            .then(results => {
                Ambiance.loadAll(results);

            })
            .then(callback)
    }


    Video.fetchAll = (callback) => {
        $.get(`${__API_URL__}/api/v1/videos`)
            .then(results => {
                Video.loadAll(results);

            })
            .then(callback)
    }


    // module.Song = Song;
    // module.Video = Video;
    // module.Ambiance = Ambiance;
    // module.soundmood = soundmood;

    //#####################PLAYER#######################################

    var player1;
    var player2;
    var player3;
    soundmood.createPlayer = function(ctx,next) {
        player1 = new YT.Player('player1', {
                              
            videoId: `${Video.all[2].uri}`,
            playerVars: { 'playlist': '668nUCeBHyY', 'rel': 0, 'showinfo': 0, 'loop': 1, 'autoplay': 1, 'controls': 0 },
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
                              videoId: `${Song.all[5].uri}`,
                              playerVars: { 'rel': 0, 'showinfo': 0, 'loop': 1, 'autoplay': 1, 'controls': 0 },
                              events: {
                                'onReady': onPlayer3Ready,
                              }
                            })
                              
                              



    };

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


    module.Song = Song;
    module.Video = Video;
    module.Ambiance = Ambiance;
    module.soundmood = soundmood;

})(window)

