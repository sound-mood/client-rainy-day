'use strict';


(function (module) {
    const previewView = {};
    var preview = {};

    previewView.init = function (ctx, next) {        
        console.log('previewView.init route hit');
        
        // TODO double check this... this object should push the context object into the object constructor above
        console.log('context object', ctx);
        preview = new Preset(ctx);

        $('#playlist-preview').empty();
        console.log('preview object', preview);
        console.log('preview songs', preview.songs);
        $('#playlist-preview').append(preview.presetToHtml($('#preview-template').text()));


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

        var songUriArray = preview.songs.map(a => a.uri);
        console.log('songuri array', songUriArray);

        module.videoURI = preview.videoURI;
        module.ambianceURI = preview.ambianceURI;
        
        
        var songUriString = '\'';
        for (var i = 0; i < songUriArray.length; i++) {
            songUriString += songUriArray[i] + '\', \'';
        }
        songUriString += songUriArray[songUriArray.length - 1] + '\'';
        console.log('song uri string', songUriString);
        module.firstSong = songUriArray[0];
        module.songUriString = songUriString;        
    }

    
    module.preview = preview;
    module.previewView = previewView;


})(window)