'use strict';

function showCustomOpts(ctx) {

    if(!$('#playlist-selections').hasClass('hide')) {
        $('#playlist-selections').addClass('hide');
    }

    if(!$('#your-current-playlist').hasClass('hide')) {
        $('#your-current-playlist').addClass('hide');
    }


    if(!$('#create-playlist').hasClass('hide')) {
        $('#create-playlist').addClass('hide');

    }

    $('#custom-options').toggleClass('hide');
}





function showHomePage() {
    soundmood.fetchAll();
    $('#log-in').hide();
    $('#audio-visual').hide();
    if(!$('#player').hasClass('hide')) {
        $('#player').addClass('hide');
    }
    $('#menu').show();
    $('#all-content').show();
    if(!$('#your-current-playlist').hasClass('hide')) {
        $('#your-current-playlist').addClass('hide');
    }

    if (soundmood.playersCreated === true) {
        soundmood.stopPlayer();
    }
}

function showHidePreview() {
    $('#playlist-preview').toggleClass('hide');
}

function homePageInit (ctx, next) {
    $('#all-content').hide();
    function signupSubmit(e) {
        e.preventDefault();
        let username = $('#username').val();
        let user = new User({
            name: `${username}`
        });
    
        user.insertRecord();
        user.setUser();
        $('#log-in').hide();
        $('#all-content').show();
        if(!$('#your-current-playlist').hasClass('hide')) {
            $('#your-current-playlist').addClass('hide');
        }
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
        if(!$('#your-current-playlist').hasClass('hide')) {
            $('#your-current-playlist').addClass('hide');
        }
    }

    $('#sign-up-button').on('click', signupSubmit);
    $('#log-in-button').on('click', loginSubmit);

    next();
    
}

function addSVA() {
    $('#playlist-add-opts').hide();
    $('#SVA-opts').show();
}

function pushSongsToCustom(ctx) {
    var index = (parseInt(ctx.params.song_id) - 1);
    custom.songs.push(Song.all[index].uri);
}

function logout(ctx) {
    soundmood.currentUser = 0;
    window.location = '/';
}



page('/', homePageInit, soundmood.fetchAll)
page('/playlist', playlistView.init)
page('/playlist/:playlist_id', previewView.init)


page('/custom', showCustomOpts)
page('/home', showHomePage)
page('/preview', showHidePreview)
page('/logout', logout)
page('/custom/music', musicView.init)
page('/custom/music/:song_id', custom.pushSongsToCustom, custom.showButton)
page('/custom/sound', soundView.init)
page('/custom/sound/:sound_id', custom.addSoundToCustom, custom.showButton)
page('/custom/video', videoView.init)
page('/custom/video/:video_id', custom.addVideoToCustom, custom.showButton)
page('/custom/player', custom.initiatePlayer)
page('/create', createView.init)
page('/player', playerView.init)
page('/playlist-add', addSVA)



page();