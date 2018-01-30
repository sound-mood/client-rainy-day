'use strict';


(function (module) {
    const createView = {};

    createView.init = function (ctx, next) {
        console.log('createView.init route hit');

        if (!$('#custom-options').hasClass('hide')) {
            $('#custom-options').addClass('hide');
        }

        if (!$('#playlist-selections').hasClass('hide')) {
            $('#playlist-selections').addClass('hide');
        }

        
        $('#create-playlist').toggleClass('hide');
    }

    module.createView = createView;
})(window);