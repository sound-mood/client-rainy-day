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

    function Playlist(rawDataObj) {
        Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
    }

    function User(rawDataObj) {
        Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
    }

    function Preview(ctx) {
        let index = (parseInt(ctx.params.playlist_id) - 1);
        console.log('playlist index', index);
        let currentPlaylist = Playlist.all[index];
        this.name = currentPlaylist.name;
        this.video = Video.all[currentPlaylist.video_id - 1].name;
        this.videoURI = Video.all[currentPlaylist.video_id - 1].uri;
        this.ambiance = Ambiance.all[currentPlaylist.ambiance_id - 1].name;
        this.ambianceURI = Ambiance.all[currentPlaylist.ambiance_id - 1].uri;
        // once have foreign keys, can grab songs and URI's.
        // this.song
    }

    //  THIS IS A TEST

    
    // gonna need to create an object constructor which will put playlist objects in this array so that they can be called by the playlistView.init function
    // TODO: should probably only be triggered when the /playlist route is hit??? don't need it every time
    let presetPlaylists = [];

    // array full of objects housing respective data, initialized on page load
    Song.all = [];
    Ambiance.all = [];
    Video.all = [];
    Playlist.all = [];
    

    Song.loadAll = rawData => {
        console.log(rawData);

        

        Song.all = rawData.map((songObj) => new Song(songObj));

        // TODO: add code so that if user_id is 0 or the individual's user_id then it appends certain songs
        Song.all.forEach(a => {
            $('#music-selection').append(a.songToHtml())
        });
    }

    User.prototype.insertRecord = function(){
        $.ajax({
            url: `${__API_URL__ }/api/v1/users`,
            method: 'POST',
            data: {
              name: this.name,
              
            },
            
        })
    };


    Song.prototype.insertRecord = function(){
        $.ajax({
            url: `${__API_URL__ }/api/v1/songs`,
            method: 'POST',
            data: {
              name: this.name,
              artist: this.artist,
              URI: this.URI,
            },
            
        })
    };

    Playlist.prototype.insertRecord = function(){
        $.ajax({
            url: `${__API_URL__ }/api/v1/playlists`,
            method: 'POST',
            data: {
              name: this.name
            },
            
        })
    };

    Video.prototype.insertRecord = function(){
        $.ajax({
            url: `${__API_URL__ }/api/v1/videos`,
            method: 'POST',
            data: {
              name: this.name,
              URI: this.URI
            },
            
        })
    };

    Ambiance.prototype.insertRecord = function(){
        $.ajax({
            url: `${__API_URL__ }/api/v1/ambiance`,
            method: 'POST',
            data: {
              name: this.name,
              URI: this.URI
            },
            
        })
    };




    

    Ambiance.loadAll = rawData => {
        Ambiance.all = rawData.map((ambianceObj) => new Ambiance(ambianceObj));

        // TODO: add code so that if user_id is 0 or the individual's user_id then it appends certain ambiances
        Ambiance.all.forEach(a => {
            $('#sound-selection').append(a.ambianceToHtml())
        });

    }

    Video.loadAll = rawData => {
        Video.all = rawData.map((videoObj) => new Video(videoObj));
        // TODO: add code so that if user_id is 0 or the individual's user_id then it appends certain videos
        Video.all.forEach(a => {
            $('#video-selection').append(a.videoToHtml())
        });

    }

    Playlist.loadAll = rawData => {
        Playlist.all = rawData.map((playlistObj) => new Playlist(playlistObj));

        // TODO: add code so that if user_id is 0 or the individual's user_id then it appends certain playlists
        Playlist.all.forEach(a => {
            $('#playlist-selections').append(a.playlistToHtml())
        });

    }

    // TODO: ask why didn't this work as a lexical arrow function
    Song.prototype.songToHtml = function() {
        let template = Handlebars.compile($('#song-choices-template').text());
        return template(this);
    }

    Ambiance.prototype.ambianceToHtml = function() {
        let template = Handlebars.compile($('#ambiance-choices-template').text());
        return template(this);
    }

    Video.prototype.videoToHtml = function() {
        let template = Handlebars.compile($('#video-choices-template').text());
        return template(this);
    }

    Playlist.prototype.playlistToHtml = function() {
        let template = Handlebars.compile($('#playlist-template').text());
        return template(this);
    }

    Preview.prototype.previewToHtml = function() {
        let template = Handlebars.compile($('#preview-template').text());
        return template(this);
    }


    soundmood.fetchAll = function () {
        Song.fetchAll();
        Ambiance.fetchAll();
        Video.fetchAll();
        Playlist.fetchAll();
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

    Playlist.fetchAll = (callback) => {
        $.get(`${__API_URL__}/api/v1/playlists`)
            .then(results => {
                Playlist.loadAll(results);
            })
            .then(callback)
    }
   
    //#####################PLAYER#######################################

    var player1;
    var player2;
    var player3;
    soundmood.createPlayer = function(ctx,next) {
        player1 = new YT.Player('player1', {
                              
            videoId: `${Song.all[0].uri}`,
            playerVars: { 'playlist': `${Song.all}`, 'rel': 0, 'showinfo': 0, 'loop': 1, 'autoplay': 1, 'controls': 1 },
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
                              videoId: `${Song.all[6].uri}`,
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

    module.User = User;
    module.Playlist = Playlist;
    module.Song = Song;
    module.Video = Video;
    module.Ambiance = Ambiance;
    module.Preview = Preview;
    module.soundmood = soundmood;

})(window)

