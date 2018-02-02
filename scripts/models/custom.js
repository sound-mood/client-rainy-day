'use strict';

(function(module) {
    let custom = {};
    custom.songNames = [];
    custom.songsUri = [];
    custom.sound = {};
    custom.video = {};
    let customView = {};

    module.customView = customView;
    
 

    function newSound(e) {
        e.preventDefault();
        let ambURI = $('#sound-url').val().split('=')[1];
        let ambiance = new Ambiance({
            name: $('#new-sound').val(),
            URI:  `${ambURI}`,
        });
    
        ambiance.insertRecord();
        
    
    }

    function newVideo(e) {
        e.preventDefault();
        let vidURI = $('#video-url').val().split('=')[1];
        let video = new Video({
            name: $('#new-video').val(),
            URI:  `${vidURI}`,
        });
    
        video.insertRecord();
        
    
    }

    function newSong(e) {
        e.preventDefault();
        let songURI = $('#song-url').val().split('=')[1];
        let song = new Song({
            name: $('#new-song').val(),
            artist: $('#song-artist').val(),
            URI:  `${songURI}`,
        });
    
        song.insertRecord();
        
    }


    custom.pushSongsToCustom = (ctx, next) => {
        var index = (parseInt(ctx.params.song_id) - 1);
        let title = `${Song.all[index].name} - ${Song.all[index].artist}`;
        custom.songNames.push(title);
        custom.songsUri.push(Song.all[index].uri);
        next();
    }

    custom.addSoundToCustom = (ctx, next) => {
        var index = (parseInt(ctx.params.sound_id) - 1);
        custom.sound.sound_id = Ambiance.all[index].ambiance_id;
        custom.sound.uri = Ambiance.all[index].uri;
        custom.sound.name = Ambiance.all[index].name;
        next();
    }

    custom.addVideoToCustom = (ctx, next) => {
        var index = (parseInt(ctx.params.video_id) - 1);
        custom.video.video_id = Video.all[index].video_id;
        custom.video.uri = Video.all[index].uri;
        custom.video.name = Video.all[index].name;
        next();
    }

    custom.showButton = (ctx) => {
        $('#custom-player-button').removeClass('hide');
        // TODO add object to database when button is pressed
        $('#title-playlist').removeClass('hide');

    }

    custom.initiatePlayer = () => {
        let songUriString = '\'';
        for (var i = 0; i < custom.songsUri.length; i++) {
            songUriString += custom.songsUri[i] + '\', \'';
        }
        songUriString += custom.songsUri[custom.songsUri.length - 1] + '\'';
        let firstSong = custom.songsUri[0];

        soundmood.createPlayer(custom.video.uri, custom.sound.uri, songUriString, firstSong);
        $('#menu').toggleClass('hide');
        $('#player').removeClass('hide');
    }

    
    function newPlaylist(e) {
        e.preventDefault();
        let amb = custom.sound.sound_id;
        let vid = custom.sound.video_id;
        let playlist = new Playlist({
            name: $('#new-playlist').val(),
            ambiance_id: amb,
            video_id: vid
        });
        $('#SVA-opts').show();
        $('#title-playlist').toggleClass('hide');
        playlist.insertRecord();
        playlist.setPlaylistNew();
        
    
    }

    $(document).ready(function() {
        $('#playlist-insert').on('click', newPlaylist);
    });


    module.custom = custom;
    module.customView = customView;

})(window);