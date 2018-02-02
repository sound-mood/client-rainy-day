'use strict';

(function (module) {
    const playlistView = {};

    playlistView.init = function (ctx, next, e) {
        console.log('playlistView.init route hit');

        if (!$('#custom-options').hasClass('hide')) {
            $('#custom-options').addClass('hide');
        }

        if (!$('#create-playlist').hasClass('hide')) {
            $('#create-playlist').addClass('hide');
        }        

        if (!$('#sound-selection').hasClass('hide')) {
            $('#sound-selection').addClass('hide');
        }
        if (!$('#music-selection').hasClass('hide')) {
            $('#music-selection').addClass('hide');
        }
        if (!$('#video-selection').hasClass('hide')) {
            $('#video-selection').addClass('hide');
        }
        
        $('#playlist-selections').toggleClass('hide');
    }

    module.playlistView = playlistView;
})(window);