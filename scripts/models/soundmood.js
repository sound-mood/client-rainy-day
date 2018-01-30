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
        Song.all.forEach(a => {
            console.log(a);
            $('#music-selection').append(a.songToHtml())
        });
    }

    Ambiance.loadAll = rawData => {
        Ambiance.all = rawData.map((ambianceObj) => new Ambiance(ambianceObj));
        Ambiance.all.forEach(a => {
            // console.log(a);
            $('#sound-selection').append(a.ambianceToHtml())
        });

    }

    Video.loadAll = rawData => {
        console.log('video raw data', rawData);
        Video.all = rawData.map((videoObj) => new Video(videoObj));
        console.log(Video.all);
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

    module.Song = Song;
    module.Video = Video;
    module.Ambiance = Ambiance;
    module.soundmood = soundmood;

})(window)