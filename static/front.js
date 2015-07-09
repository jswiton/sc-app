SC.initialize({
      client_id: "db62c1a96727de31bc97793eabd644e8",
      redirect_uri: "http://example.com/callback.html",
  });

$(document).ready(function() {

        
   var playing = false;    

	// Play a track
	play = function(ID) {
	
	  if(playing){
		var volume = 100,
				fade;
			
			console.log(ID + " fade out...");
			fade = setInterval(function() {
			
				volume -= 5;
				
				if ( volume > 1 ) {
					SC.sound.setVolume(volume);
				} else {
					SC.sound.setVolume(0);
					SC.sound.stop();
					SC.sound.destruct();
					clearInterval(fade);
					console.log(ID + " stopped...");
					stream(ID);
				}

			}, 50);
	  } else {
			stream(ID);
	  }

		
    }
	
	stream = function (ID) {
		SC.stream('/tracks/' + ID, {
			onconnect : function() {
				console.log(ID + " connect...");
			},
			onload : function() {
				console.log(ID + " load...");
			},
			onplay : function() {
				console.log(ID + " play...");
			},
			onresume : function() {
				console.log(ID + " resume...");
			},
			onpause : function() {
				console.log(ID + " pause...");			
			},
			onfinish : function() {
				console.log(ID + " finish...");
			}
		}, function(sound) {
			SC.sound = sound;
			SC.sound.play();
			playing = true;
		});
	}

	// Stop the currently playing track
	stop = function(){

	  if(playing){
		var volume = 100,
				fade;
			
			console.log("fade out...");
			fade = setInterval(function() {
			
				volume -= 5;
				
				if ( volume > 1 ) {
					SC.sound.setVolume(volume);
				} else {
					SC.sound.setVolume(0);
					SC.sound.stop();
					SC.sound.destruct();
					clearInterval(fade);
					console.log("stopped...");
				}

			}, 50);
	  }
	}
    
    $('body').on( 'click', 'a.start', function(e) {
		e.preventDefault();
		var track_id = $( this ).attr('data-track-id');
		play(track_id);
	  });

    $('body').on( 'click', 'a.pause', function(e) {
		e.preventDefault();
		SC.sound.pause();
	  });

    $('body').on( 'click', 'a.play', function(e) {
		e.preventDefault();
		SC.sound.play();
	  });

    $('body').on( 'click', 'a.stop', function(e) {
		e.preventDefault();
		stop();
	  });

});