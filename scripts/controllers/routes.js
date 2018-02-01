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

function loginSubmit(e) {
    e.preventDefault();
    let user = new User({
        name: $('#username').val()
    });

    user.insertRecord();

}

function showLogIn(ctx, next) {
    console.log('log in route hit');
    
    if(!$('#all-content').hasClass('hide')) {
        $('#all-content').addClass('hide');
    }

    $('#log-in').toggleClass('hide');

    $('#log-in-form').on('submit', loginSubmit);
}

function showHomePage() {
    if(!$('#log-in').hasClass('hide')) {
        $('#log-in').addClass('hide');
    }

    $('#all-content').toggleClass('hide');
}

function showHidePreview() {
    $('#playlist-preview').toggleClass('hide');
}

// this will need to grab the ID of the playlist and use it to display the predetermined music experience
page('/', soundmood.fetchAll)
page('/playlist', playlistView.init)
page('/playlist/:playlist_id', previewView.init)
//this will just render the custom options menu
page('/custom', showCustomOpts)
page('/login', showLogIn)
page('/home', showHomePage)
page('/preview', showHidePreview)

// // these will need additional functions added to them to customize the music experience based on params passed through the ctx object
page('/custom/music', musicView.init)
page('/custom/sound', soundView.init)
page('/custom/video', videoView.init)
page('/create', createView.init)
page('/player', playerView.init, soundmood.createPlayer)




page();