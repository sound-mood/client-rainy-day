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





function showHomePage() {
    if(!$('#log-in').hasClass('hide')) {
        $('#log-in').addClass('hide');
    }

    $('#all-content').show();
}

function showHidePreview() {
    $('#playlist-preview').toggleClass('hide');
}

function homePageInit (ctx, next) {
    $('#all-content').hide();
    console.log('home page init');
    function signupSubmit(e) {
        e.preventDefault();
        let username = $('#username').val();
        let user = new User({
            name: `${username}`
        });
    
        user.insertRecord();
        user.setUser();
        console.log(soundmood.currentUser);
        $('#log-in').hide();
        $('#all-content').show();
    }        
    
    function loginSubmit(e) {
        e.preventDefault();
        let username = $('#username').val();
        let user = new User({
            name: `${username}`
        });
        user.setUserLogin();
        $('#log-in').hide();
        $('#all-content').show();
    }

    $('#sign-up-button').on('click', signupSubmit);
    $('#log-in-button').on('click', loginSubmit);

    next();
}

// this will need to grab the ID of the playlist and use it to display the predetermined music experience
page('/', homePageInit, soundmood.fetchAll)
page('/playlist', playlistView.init)
page('/playlist/:playlist_id', previewView.init)
//this will just render the custom options menu
page('/custom', showCustomOpts)
page('/home', showHomePage)
page('/preview', showHidePreview)

// // these will need additional functions added to them to customize the music experience based on params passed through the ctx object
page('/custom/music', musicView.init)
page('/custom/sound', soundView.init)
page('/custom/video', videoView.init)
page('/create', createView.init)
page('/player', playerView.init)





page();