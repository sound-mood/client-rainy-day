'use strict';

// this function will either add or remove the "hide" class on the playlists, when the page is rendered it is on "hide" by default
function showPresetPlaylists (ctx, next) {
  $('preset-playlists').toggleClass('hide');
}

function showCustomOpts (ctx, next) {

}

function showSongOpts (ctx, next) {

}

function showSoundOpts (ctx, next) {

}

function showVideoOpts (ctx, next) {

}



// this will need to grab the ID of the playlist and use it to display the predetermined music experience
page('/playlist', showPresetPlaylists)

//this will just render the custom options menu
page('/custom', showCustomOpts)

// these will need additional functions added to them to customize the music experience based on params passed through the ctx object
page('/custom/song', showSongOpts)
page('/custom/sounds', showSoundOpts)
page('/custom/video', showVideoOpts)



$(function() {
  page();
})