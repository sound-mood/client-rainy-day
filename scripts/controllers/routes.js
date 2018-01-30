'use strict';

function showCustomOpts(ctx) {
    console.log('custom options route hit')

    if(!$('#playlist-selections').hasClass('hide')) {
        $('#playlist-selections').addClass('hide');
    }

    if(!$('#create-playlist').hasClass('hide')) {
        $('#create-playlist').addClass('hide');

    }

    $('#custom-options').toggleClass('hide');
}

// this will need to grab the ID of the playlist and use it to display the predetermined music experience
page('/', soundmood.fetchAll)
page('/playlist', playlistView.init)
//this will just render the custom options menu
page('/custom', showCustomOpts)

// // these will need additional functions added to them to customize the music experience based on params passed through the ctx object
page('/custom/music', musicView.init)
page('/custom/sound', soundView.init)
page('/custom/video', videoView.init)
page('/create', createView.init)
page('/preview', previewView.init)
page('/player', playerView.init)


page();