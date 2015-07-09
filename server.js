    
    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var SCResolver = require('soundcloud-resolver');
    var backendUtils = require('./inc/utils.js');

    // configuration =================

    app.use(express.static(__dirname + '/static'));                 // set the static files location /public/img will be /img for users
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

    // define model =================
    var SCres = new SCResolver(client_id);
    
    // routes ======================================================================

    // api ---------------------------------------------------------------------

    // getUser
    app.post('/api/soundcloud/getUser', function(req, res) {

        var username = req.body.text.replace(/ /g,'');

        SCres.resolve( "http://soundcloud.com/" + username, function( err, user ) {
            if ( err ) 
                res.send(err);
                
            console.log("request: " + req.body.text.replace(/ /g,''));
            console.log("response: " + user);
            if (user.errors) {
                if (user.errors[0].error_message === '404 - Not Found') {
                    console.log("errors: " + user.errors[0].error_message);
                    user = [];
                }    
            }
            res.json(user);
        });

    });

    //getFavoritesTracks
    app.post('/api/soundcloud/getFavTracks', function(req, res) {

        var userID = req.body.id;
        var utils = new backendUtils();

        utils.getFavoritesTracks(userID, function(err, tracks) {
            if ( err )
                res.send(err);

            res.json(tracks);
        });

    });

     // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

    // listen (start app with node server.js) ======================================
    app.listen(8081);
    console.log("Soundcloud Client listening on port 8081");