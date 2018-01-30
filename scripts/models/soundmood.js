'use strict';

// var __API_URL__ = 'https://rainy-day-v2.herokuapp.com'
var __API_URL__ = 'http://localhost:3000'


    let soundmood = {};
    
    function Song(rawDataObj) {
        Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
        
    }

    function Ambiance(rawDataObj) {
        Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
    }

    function Video(rawDataObject) {
        Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
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
        console.log(rawData);
        // rawData.sort((a, b) => {
        //     if (a.id < b.id) return -1;
        //     if (a.id > b.id) return 1;
        //     return 0;
        // }); 

        // TODO: again, double check that data comes back as rows
        Song.all = [];
        Song.all = rawData.map((songObj) => new Song(songObj));
    }

    Ambiance.loadAll = rawData => {
        

        Ambiance.all = rawData.map((ambianceObj) => new Ambiance(ambianceObj));
    }

    Video.loadAll = rawData => {
        Video.all = rawData.rows.map((videoObj) => new Video(videoObj));
    }
       


    soundmood.fetchAll = function () {
        Song.fetchAll();
        //Ambiance.fetchAll();
        //Video.fetchAll();
    }

    Song.fetchAll = (callback) => {
        $.get(`${__API_URL__}/api/v1/songs`)
            .then(results => {
                Song.loadAll(results);
            })
            .then(callback)
    }

    Video.fetchAll = (callback) => {
        $.get(`${__API_URL__}/api/v1/songs`)
            .then(results => {
                Song.loadAll(results);
            })
            .then(callback)
    }

    Ambiance.fetchAll = (callback) => {
        $.get(`${__API_URL__}/api/v1/songs`)
            .then(results => {
                Song.loadAll(results);
            })
            .then(callback)
    }

    // module.Song = Song;
    // module.Video = Video;
    // module.Ambiance = Ambiance;
    // module.soundmood = soundmood;
