var SCApi = angular.module('SCApi', []);

SCApi.service('stream', function() {

    var favoritesCount = {
        strCount: ''
    };

    var avatarUrl = {
        strurl: ''
    };

    var user = [];

    // var favoritesTracks = {
    //     tracksList: {},
    //     count: ''
    // };

    // var user = {
    //     strUserName: '',
    //     favoritesTracks: {}
    // };
    
    return {
        getAvatarUrl: function() {
            return avatarUrl;
        },
        setAvatarUrl: function(value) {
            avatarUrl.strUrl = value;
        },

        getFavoritesCount: function() {
            return favoritesCount;
        },
        setFavoritesCount: function(value) {
            favoritesCount.strCount = value;
        },
        getUser: function() {
            return user;
        },
        setUser: function(value) {
            user = value;
        }
    }


    // return {
    //     getFavoritesTracks: function() {

    //     }
    // }

    // return {
    //     getUser: function() {

    //     }
    // }

});


SCApi.controller('TracksController', function($scope, $http, stream) {
    $scope.formData = {};

    // when landing on the page, get all tracks and show them
/*    $http.post('/api/soundcloud')
        .success(function(data) {
            $scope.tracks = data; 
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
    });*/

    $scope.searchFavorites = function() {
         $http.post('/api/soundcloud/getUser', $scope.formData)
            .success(function(user) {

                console.log('getUser response: ' + user);

                stream.setUser(user);
                $scope.user = user;

                if (user.length != 0) {
                    stream.setAvatarUrl(user.avatar_url);

                    $http.post('/api/soundcloud/getFavTracks', user)
                        .success(function(tracks) {
                            
                            $scope.tracks = tracks;
                            $scope.favoritesCount = user.public_favorites_count;
                            stream.setFavoritesCount(user.public_favorites_count);

                            console.log($scope.formData);
                            console.log(tracks);
                            //play(angular.element('[ng-controller=TracksController]').scope().tracks[0].id);
                        })
                        .error(function(tracks) {
                            console.log('Error: ' + tracks);
                    });
                }

            })
            .error(function(user) {
                console.log('Error: ' + user);
        });
    };

    $scope.showCurrentTrack = function(track) {
        $scope.currentTrackTitle = track.title;
        $scope.currentTrackArtwork_url = track.artwork_url;
        $scope.currentTrackUsername = track.user.username;
    }
         
});

SCApi.controller('favoritesController', function($scope, stream) {
    $scope.favoritesCount = stream.getFavoritesCount();
    $scope.avatarUrl = stream.getAvatarUrl();
});