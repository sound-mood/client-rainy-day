'use strict';


(function (module) {
    const loginView = {};


    loginView.init = function(ctx, next) {
        console.log('log in route hit');
        
        if(!$('#all-content').hasClass('hide')) {
            $('#all-content').addClass('hide');
        }
    
        $('#log-in').toggleClass('hide');


        function signupSubmit(e) {
            e.preventDefault();
            let username = $('#username').val();
            let user = new User({
                name: `${username}`
            });
        
            user.insertRecord();
            user.setUser();
            console.log(soundmood.currentUser);
        }

            
        
        
        function loginSubmit(e) {
            e.preventDefault();
            let username = $('#username').val();
            let user = new User({
                name: `${username}`
            });

            user.setUserLogin();
        }
    
        $('#sign-up-button').on('click', signupSubmit);
        $('#log-in-button').on('click', loginSubmit);
    }


    

    module.loginView = loginView;
})(window);