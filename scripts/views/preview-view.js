'use strict';


(function (module) {
    const previewView = {};

    previewView.init = function (ctx, next) {
        console.log('previewView.init route hit');

        // this sends each item in the presetPlaylists array to the toHtml method which appends the playlist preview to the website
        // app.soundmood.presetPlaylists.forEach(a => $('playlist-selections').append(a.playlistPreviewToHtml()));

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
        
        if (!$('#playlist-selections').hasClass('hide')) {
            $('#playlist-selections').addClass('hide');
        }
        
        $('#preview-view').removeClass('hide');
    }

    module.previewView = previewView;
})(window);