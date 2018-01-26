'use strict';

(function (module) {
    const soundView = {};
    
    soundView.init = function (ctx, next) {
        console.log('route hit');

        $('#sound-selection').toggleClass('hide');
        
        // hides music and sound selection area
        if (!$('#music-selection').hasClass('hide')) {
            $('#music-selection').addClass('hide');
        }
        if (!$('#video-selection').hasClass('hide')) {
            $('#video-selection').addClass('hide');
        }
    }
    
    module.soundView = soundView;
})(window);