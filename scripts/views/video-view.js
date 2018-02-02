'use strict';

(function (module) {
    const videoView = {};
    
    videoView.init = function (ctx, next) {

        // shows video selection area
        $('#video-selection').toggleClass('hide');
        
        // hides music and sound selection area
        if (!$('#music-selection').hasClass('hide')) {
            $('#music-selection').addClass('hide');
        }
        if (!$('#sound-selection').hasClass('hide')) {
            $('#sound-selection').addClass('hide');
        }
    }
    
    module.videoView = videoView;
})(window);