'use strict';

(function(module){
    const playerView = {};

    playerView.init = function(ctx, next) {
        console.log('playerView route hit');

        $('#menu').hide();
        $('#player').toggleClass('hide');
        next();

        // var tag = document.createElement('script');

        // tag.src = "https://www.youtube.com/iframe_api";
        // var firstScriptTag = document.getElementsByTagName('script')[0];
        // firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

       





        

       




    }
    module.playerView = playerView;
})(window)