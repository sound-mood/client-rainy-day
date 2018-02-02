'use strict';


(function (module) {
    const createView = {};


    createView.init = function (ctx, next) {

        if (!$('#custom-options').hasClass('hide')) {
            $('#custom-options').addClass('hide');
        }

        if (!$('#playlist-selections').hasClass('hide')) {
            $('#playlist-selections').addClass('hide');
        }

        $('#SVA-opts').hide();
        $('#create-playlist').toggleClass('hide');
    }

    module.createView = createView;
})(window);