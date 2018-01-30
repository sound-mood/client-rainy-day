'use strict';

(function(module){
    const playerView = {};

    playerView.init = function(ctx, next) {
        console.log('playerView route hit');

        $('#menu').hide();
        $('#player').toggleClass('hide');
        next()

       

    }
    
        module.playerView = playerView;
    })(window)
    





        

       


