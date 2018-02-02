'use strict';


(function (module) {
    const createView = {};


    function newPlaylist(e) {
        e.preventDefault();
        let playlist = new Playlist({
            name: $('#new-playlist').val()
        });
        $('#SVA-opts').show();
        
        playlist.insertRecord();
        soundmood.fetchAll();
    
    }

    function newSound(e) {
        e.preventDefault();
        let ambURI = $('#sound-url').val().split('=')[1];
        console.log(ambURI);
        let ambiance = new Ambiance({
            name: $('#new-sound').val(),
            URI:  `${ambURI}`,
        });
    
        ambiance.insertRecord();
        soundmood.fetchAll();
    
    }

    function newVideo(e) {
        e.preventDefault();
        let vidURI = $('#video-url').val().split('=')[1];
        console.log(vidURI);
        let video = new Video({
            name: $('#new-video').val(),
            URI:  `${vidURI}`,
        });
    
        video.insertRecord();
        soundmood.fetchAll();
    
    }

    function newSong(e) {
        e.preventDefault();
        let songURI = $('#song-url').val().split('=')[1];
        console.log(songURI);
        let song = new Song({
            name: $('#new-song').val(),
            artist: $('#song-artist').val(),
            URI:  `${songURI}`,
        });
    
        song.insertRecord();
        soundmood.fetchAll();
    }

    createView.init = function (ctx, next) {
        console.log('createView.init route hit');

        if (!$('#custom-options').hasClass('hide')) {
            $('#custom-options').addClass('hide');
        }

        if (!$('#playlist-selections').hasClass('hide')) {
            $('#playlist-selections').addClass('hide');
        }

        $('#SVA-opts').hide();
        $('#create-playlist').toggleClass('hide');

        $('#playlist-insert').on('click', newPlaylist);
        $('#sound-insert').on('click', newSound);
        $('#video-insert').on('click', newVideo);
        $('#song-insert').on('click', newSong);
    }

    module.createView = createView;
})(window);