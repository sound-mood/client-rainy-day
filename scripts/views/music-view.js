'use strict';

(function (module) {
    const musicView = {};
    

    musicView.init = function (ctx, next) {

        
        // hides music and sound selection area
        if (!$('#video-selection').hasClass('hide')) {
            $('#video-selection').addClass('hide');
        }
        if (!$('#sound-selection').hasClass('hide')) {
            $('#sound-selection').addClass('hide');
        }
        Song.all = [];
        soundmood.fetchAll();
        $('#music-selection').empty();
        Song.all.forEach(a => {
            $('#music-selection').append(a.songToHtml())
        });

        $('#music-selection').toggleClass('hide');
    }



    
    module.musicView = musicView;
})(window)
