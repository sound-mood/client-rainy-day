'use strict';

(function(module){
    const playerView = {};

    playerView.init = function(ctx, next) {
        soundmood.createPlayer(videoURI, ambianceURI, songUriString, firstSong);
        $('#menu').hide();
        $('#player').toggleClass('hide');
        // var tag = document.createElement('script');

        // tag.src = "https://www.youtube.com/iframe_api";
        // var firstScriptTag = document.getElementsByTagName('script')[0];
        // firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        


    }
    module.playerView = playerView;
})(window)
