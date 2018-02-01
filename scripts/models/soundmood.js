'use strict';

// var __API_URL__ = 'https://rainy-day-v2.herokuapp.com'
var __API_URL__ = 'http://localhost:3000';

(function (module) {
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


    function Preset(ctx) {
        let index = (parseInt(ctx.params.playlist_id) - 1);
        console.log('playlist index', index);
        let currentPlaylist = Playlist.all[index];
        this.name = currentPlaylist.name;
        this.video = Video.all[currentPlaylist.video_id - 1].name;
        this.videoURI = Video.all[currentPlaylist.video_id - 1].uri;
        this.ambiance = Ambiance.all[currentPlaylist.ambiance_id - 1].name;
        this.ambianceURI = Ambiance.all[currentPlaylist.ambiance_id - 1].uri;
        this.songs = Song.all.filter(a => a.playlist_id === parseInt(ctx.params.playlist_id));
    }



    // gonna need to create an object constructor which will put playlist objects in this array so that they can be called by the playlistView.init function
    // TODO: should probably only be triggered when the /playlist route is hit??? don't need it every time
    let presetPlaylists = [];

    // array full of objects housing respective data, initialized on page load
    Song.all = [];
    Ambiance.all = [];
    Video.all = [];
    Playlist.all = [];
    soundmood.currentUser = 0;
    
    

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
            error: function() {
                alert('Username Taken');
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

    Playlist.prototype.updateRecord = function (callback) {
       
        $.ajax({
          url: `${__API_URL__}/api/v1/playlists/${this.playlist_id}`,
          method: 'PUT',
          data: {
            name: this.name,
            
          }
        })
        .then(callback);
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
              URI: this.URI,
              user_id: `${soundmood.currentUser}`
            },
            
        })
    };

    Playlist.prototype.deleteRecord = (ctx, next) => {
        let playlist_id = ctx.params.playlist_id;
        $.ajax({
            url: `${__API_URL__}/api/v1/playlist/${playlist_id}`,
            method: 'DELETE',
        })
    };
           
    Song.prototype.deleteRecord = (ctx, next) => {
        let song_id = ctx.params.song_id;
        $.ajax({
            url: `${__API_URL__}/api/v1/song/${song_id}`,
            method: 'DELETE',
        })
    };        

    Video.prototype.deleteRecord = (ctx, next) => {
        let video_id = ctx.params.video_id;
        $.ajax({
            url: `${__API_URL__}/api/v1/video/${video_id}`,
            method: 'DELETE',
        })
    };   

    Ambiance.prototype.deleteRecord = (ctx, next) => {
        let ambiance_id = ctx.params.ambiance_id;
        $.ajax({
            url: `${__API_URL__}/api/v1/ambiance/${ambiance_id}`,
            method: 'DELETE',
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
    Song.prototype.songToHtml = function () {
        let template = Handlebars.compile($('#song-choices-template').text());
        return template(this);
    }

    Ambiance.prototype.ambianceToHtml = function () {
        let template = Handlebars.compile($('#ambiance-choices-template').text());
        return template(this);
    }

    Video.prototype.videoToHtml = function () {
        let template = Handlebars.compile($('#video-choices-template').text());
        return template(this);
    }

    Playlist.prototype.playlistToHtml = function () {
        let template = Handlebars.compile($('#playlist-template').text());
        return template(this);
    }

    Preset.prototype.presetToHtml = function (a) {
        let template = Handlebars.compile(a);
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

    User.prototype.setUser = (callback) => {
        $.get(`${__API_URL__}/api/v1/users`)
            .then(results => {
                console.log(results);
                console.log(results[results.length-1]);
                soundmood.currentUser = results[results.length-1].user_id;
            })
            .then(callback)
    }

    User.prototype.setUserLogin = (callback) => {
        $.get(`${__API_URL__}/api/v1/users/login`)
            .then(results => {
                console.log(results);
                console.log(results[results.length-1]);
                soundmood.currentUser = results[results.length-1].user_id;
            })
            .then(callback)
    }


   
    //#####################PLAYER#######################################

    var player1;
    var player2;
    var player3;


    soundmood.createPlayer = function (video, ambiance, songs, firstSong) {
        player1 = new YT.Player('player1', {
            // background video
            videoId: `${video}`,
            playerVars: { 'playlist': `${video}`, 'rel': 0, 'showinfo': 0, 'loop': 1, 'autoplay': 1, 'controls': 0 },
            events: {
                'onReady': onPlayer1Ready,
                'onStateChange': onPlayer1StateChange
            }
        });
        player2 = new YT.Player('player2', {

            // sound
            videoId: `${ambiance}`,
            playerVars: { 'rel': 0, 'showinfo': 0, 'loop': 1, 'autoplay': 1, 'controls': 0 },
            events: {
                'onReady': onPlayer2Ready,
            }
        });
        player3 = new YT.Player('player3', {
            // song
            videoId: `${firstSong}`,
            playerVars: { 'playlist': `${songs}`, 'rel': 0, 'showinfo': 0, 'loop': 1, 'autoplay': 1, 'controls': 0 },
            events: {
                'onReady': onPlayer3Ready,
            }



    };

    function onPlayer1Ready() {
        player1.setVolume(0);
        player1.startVideo();
    }

    function onPlayer2Ready() {
        player2.setVolume(100);
        player2.startVideo();
    }

    function onPlayer3Ready() {
        player3.setVolume(90);
        player3.startVideo();
    }

    function onPlayer1StateChange() {
        if (player1.getPlayerState() == '2') {
            player2.pauseVideo();
        } else if (player1.getPlayerState() == '1') {
            player2.playVideo();
        }

        if (player1.getPlayerState() == '2') {
            player3.pauseVideo();
        } else if (player1.getPlayerState() == '1') {
            player3.playVideo();
        }
    }

    module.User = User;
    module.Playlist = Playlist;
    module.Song = Song;
    module.Video = Video;
    module.Ambiance = Ambiance;
    module.Preset = Preset;
    module.soundmood = soundmood;

})(window)

