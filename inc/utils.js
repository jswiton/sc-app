
var express  = require('express');
var SC_client = require('node-soundcloud');

client_id = "db62c1a96727de31bc97793eabd644e8";
client_secret = "c71b4af16f51ac7350d85af76c68ec05";
redirect_uri = "http://example.com/callback.html";

// Initialize client
SC_client.init({
  id: client_id,
  secret: client_secret,
  uri: redirect_uri
});

function Utils() {

        this.getFavoritesTracks = function(user_id, callback) {

             SC_client.get('/users/' + user_id + '/favorites', function(err, tracks) {
              	if ( err )
             		res.send(err);

              	callback(null, tracks);
              	console.log('FavoritesTracks:', tracks);
            });

        }

    }

    module.exports = Utils;