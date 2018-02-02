'use strict';

(function(module) {
    let custom = {};
    custom.songNames = [];
    custom.songsUri = [];
    custom.sound = {};
    custom.video = {};
    let customView = {};

    module.customView = customView;
    
    custom.pushSongsToCustom = (ctx, next) => {
        var index = (parseInt(ctx.params.song_id) - 1);
        console.log('index', index);
        console.log('song at index uri', Song.all[index].uri);
        let title = `${Song.all[index].name} - ${Song.all[index].artist}`;
        custom.songNames.push(title);
        custom.songsUri.push(Song.all[index].uri);
        next();
    }

    custom.addSoundToCustom = (ctx, next) => {
        var index = (parseInt(ctx.params.sound_id) - 1);
        console.log('sound index', index);
        console.log('sound at index uri', Ambiance.all[index].uri);
        custom.sound.uri = Ambiance.all[index].uri;
        custom.sound.name = Ambiance.all[index].name;
        next();
    }

    custom.addVideoToCustom = (ctx, next) => {
        var index = (parseInt(ctx.params.video_id) - 1);
        custom.video.uri = Video.all[index].uri;
        custom.video.name = Video.all[index].name;
        next();
    }

    custom.showButton = (ctx) => {
        $('#custom-player-button').removeClass('hide');
        // TODO add object to database when button is pressed
        $('#custom-playlist-insert').removeClass('hide');
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

    module.custom = custom;
    module.customView = customView;

})(window);