angular.module('battles.data', [])

.factory('battlesData', function($rootScope, $timeout, glob){
  var battlesData = {
    listings: [],
    history: []
  };
  var self = battlesData;
  var listingOpened = false;
  var currentGameView;

  var socket = new glob.ansocket($rootScope);

  var isLoading = false;

  function loadListings () {
    if (conf.dummy_data) {
      battlesData.listings = testBattlesListings;
      processAllListings();
    } else if (!isLoading) { 
      // load data from api
      isLoading = true;
      glob.get('/api/battles/current', {}, function(resp) {
        battlesData.listings = resp.games;
        processAllListings();
        isLoading = false;
      }, function(err) {
        console.log('Error loading battle listings', err);
        isLoading = false;
      })
    }
  }

  function getPlaceholderData (pos) {
    return {
      position: pos,
      name: 'Empty Slot',
      img: '',
      id: ''
    };
  }

  function processAllListings () {
    battlesData.listings.forEach(function(listing) {
      processListing(listing);
    });
    $rootScope.$broadcast('battlesUpdated');
  }

  function processListing (listing) {
    listing.playerCount = listing.players.length;
    listing.players.sort(function(a, b) { return a.position - b.position; });
    var placeholderAdded = false;
    var curPos = 0;
    while (curPos < listing.playerLimit) {
      if (curPos < listing.players.length && listing.players[curPos].position !== curPos) {
        listing.players.splice(curPos, 0, getPlaceholderData(curPos));
        placeholderAdded = true;
      } else if (curPos >= listing.players.length) { // missing players, populate with empty spot
        listing.players.push(getPlaceholderData(curPos));
        placeholderAdded = true;
      }
      curPos++;
    }
    if (listing.state > 2) {
      listing.currentRound = listing.cases.length - 1;
    }
    if (listing.state === 2 && listing.currentRound < listing.cases.length) {
      listing.cases[listing.currentRound].current = true;
    }
    if (placeholderAdded && listing.openings) {
      listing.openings[''] = [];
    }
    console.log('listing: %o', listing);
  }

  self.loadListings = loadListings;
  self.processListing = processListing;

  battlesData.getListings = function(n, value){
    n = n || 25;
    value = value || 0;
    var activeLen = this.listings.length;
    if (!this.listings.length && conf.dummy_data) {
      this.listings = testBattlesListings;
    };
    if (n > activeLen) {
      var fillerLen = n - activeLen;
      return this.listings.concat(this.history.filter(function(listing) {
        if (battlesData.listings.find(function(existingListing) {
          return existingListing.id === listing.id;
        })) {
          return false;
        }
        return listing.totalUnboxed > value;
      }).slice(0, fillerLen));
    } else {
      return this.listings;
    }
  };

  battlesData.loadHistory = function() {
    glob.get('/api/battles/history', {}, function(result) {
      battlesData.history = result.games;
      $rootScope.$broadcast('battlesHistoryUpdated');
    });
  }

  battlesData.getHistory = function(){    
    var ret = this.history;
    if (!ret.length && conf.dummy_data) {
      ret = testBattlesListings;
    }
    return ret;
  }

  battlesData.subListings = function () {
    listingOpened = true;
    socket.emit('subl', 'ba', function(err) {
      if (err) {
        console.log('error subbing to battle listing', err);
      } else {
        console.log('subbed to battle listing');
      }
    });
  };

  battlesData.unsubListings = function() {
    listingOpened = false;
    socket.emit('unsubl', 'ba', function(err) {
      if (err) {
        console.log('error unsubbing from battle listing', err);
      } else {
        console.log('unsubbed from battle listing');
      }
    });
  };

  battlesData.setCurrentGameView = function(id) {
    currentGameView = id;
  };

  socket.on('ba_notify', function(data) {
    if (data.id !== currentGameView) {
      var instance = glob.printsuccess('battles.game-starting-noti', {wager: data.cost, playerLimit: data.playerLimit},15000);
      instance.onclick = function() {
        $rootScope.openBattlesGame(data.id);
        instance.destroy();
      };
    }
  });

  socket.on('ba', function(data) {
    if (data.action == "remove") {
      for (var i = battlesData.listings.length - 1; i >= 0; i--) {
        var listing = battlesData.listings[i];
        if (listing.id === data.id) {
          battlesData.listings.splice(i,1);
          break;
        }
      }
    } else {
      processListing(data);
      if (data.me && data.state == 2) {         
        // bring user to game?
      }
      var exListing = null;
      
      battlesData.listings.forEach(function(listing, i) {
        if (listing.id === data.id) {
          exListing = listing;          
        }
      });

      if (exListing) {
        console.log('This ba listing existed:', exListing);
        
        if (data.winner && !exListing.winner) { 
          var dur = conf.CF_TOHISTORYDELAY || 20000;
          $timeout.cancel(exListing.historyTimer);         
          exListing.historyTimer = $timeout(function() {                               
            battlesData.listings.splice(battlesData.listings.indexOf(exListing),1);
            battlesData.history.unshift(exListing); 
              delete exListing.historyTimer;                
              $rootScope.$broadcast('battlesUpdated'); 
              $rootScope.$broadcast('battlesHistoryUpdated');            
          }, dur);
          exListing.historyTimer.duration = dur;          
        }
        $.extend(exListing, data);
      }
      else {
        battlesData.listings.unshift(data);
      }
    }
    $rootScope.$broadcast('battlesUpdated');
  });
  
  return self;
});


