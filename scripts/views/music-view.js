'use strict';

(function (module) {
    const musicView = {};
    
    musicView.init = function (ctx, next) {
        console.log('musicView.init route hit');

        $('#music-selection').toggleClass('hide');
            
        // hides music and sound selection area
        if (!$('#video-selection').hasClass('hide')) {
            $('#video-selection').addClass('hide');
        }
        if (!$('#sound-selection').hasClass('hide')) {
            $('#sound-selection').addClass('hide');
        }
    }
    
    module.musicView = musicView;
})(window)
