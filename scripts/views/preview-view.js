'use strict';


(function (module) {
    const previewView = {};


    previewView.init = function (ctx, next) {
        console.log('previewView.init route hit');
        
        // TODO double check this... this object should push the context object into the object constructor above
        console.log('context object', ctx);
        var preview = new Preview(ctx);
        console.log('preview object', preview);
        $('#playlist-preview').empty();
        $('#playlist-preview').append(preview.previewToHtml());

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
        
        $('#playlist-preview').removeClass('hide');
        $('#your-current-playlist').removeClass('hide');
    }

    module.previewView = previewView;
})(window)