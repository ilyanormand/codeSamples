angular.module('battlesGame.controller', [])

  .controller('battlesGame.controller', function ($window, $location, $filter, $timeout, $scope, $rootScope, $uibModal, $uibModalStack, $stateParams, $translate, battlesData, casesData, glob) {

    $rootScope.pageTitle = 'CSGOBIG - Case Battle';
    var gameId = $scope.gameId = $stateParams.id;
    var socket = new glob.ansocket($scope);
    $scope.isReady = false;
    $scope.caseBindings = [
      {},
      {},
      {},
      {}
    ];
    $scope.replayOpenings = {};

    $scope.isReplaying = false;

    if (conf.dummy_data) {
      $scope.game = {
        state: 0,
        id: "142-4242-42",
        cases: testVGOCasesData2,
        creator: '76561199167061888',
        mode: 'team', // ffa/team
        playerLimit: 4,
        cost: testVGOCasesData2.reduce(function (total, cur) { return total + cur.cost; }, 0),
        randomOrgResults: {}, // random.org data for all the case openings
        openings: {
          '76561199167061888': [{
            "caseId": 10011,
            "id": "1a297d3a-f09d-4c66-8a6b-5c5f0f6879fd",
            "time": "2019-02-27T12:14:35.600Z",
            "unboxedItems": [{name: '★ Butterfly Knife', img: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQh5hlcX0nvUOGsx8DdQBJjIAVHubSaIAlp1fb3cyhW-NmkkoyS2aCtZ-qFwW4JvMQlj7CVp9qn2Aaw_0ZtZ2z6JYbGIFQ-YV_X81btlOvxxcjrQyWGkSc', color: 'eb4b4b', price: 123.23}],
            "userId": "668760",
            "caseName": "10% Nike vIRL Box",
            "caseImg": "https://static.wax.io/d-img/dynamic-apps/img/zrep-nike-only-05f1119352.png/300x300",
            "allItems": testBoxesTopWins.results.map(function(item) { return {name: item.itemName, img: item.itemImg, color: 'eb4b4b', price: 12.12}}),
            "userName": "DPG (ಠ_ಠ)",
            "userImg": "https://steamcdn-a.opskins.media/steamcommunity/public/images/avatars/35/35485ccb21fdfdf87f03f4cd2167f61368919117_full.jpg"
          }/* opening schema data that gets populated here */,
          {
            "caseId": 10011,
            "id": "1a297d3a-f09d-4c66-8a6b-5c5f0f6879f2",
            "time": "2019-02-27T12:14:35.600Z",
            "unboxedItems": [{name: '★ Bayonet | Gamma Dopler (Factory New)', img: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zJfAJF7dG7lb-PmOfkP77DqXtZ6dZ02dbN_Iv9nBrmrkFqYD_xcI_GcQ5rYg6DrAO6xL_mgJ_uvZ2YnXtq6CJ34nqPmkS2n1gSOSUsT3Uj', color: 'eb4b4b', price: 623.23}],
            "userId": "668760",
            "caseName": "10% Nike vIRL Box",
            "caseImg": "https://static.wax.io/d-img/dynamic-apps/img/zrep-nike-only-05f1119352.png/300x300",
            "allItems": testBoxesTopWins.results.map(function(item) { return {name: item.itemName, img: item.itemImg, color: 'eb4b4b', price: 12.12}}),
            "userName": "DPG (ಠ_ಠ)",
            "userImg": "https://steamcdn-a.opskins.media/steamcommunity/public/images/avatars/35/35485ccb21fdfdf87f03f4cd2167f61368919117_full.jpg"
          },
          {
            "caseId": 10011,
            "id": "1a297d3a-f09d-4c66-8a6b-5c5f0f6879f3",
            "time": "2019-02-27T12:14:35.600Z",
            "unboxedItems": [{name: 'StatTrak™ Desert Eagle | Golden Koi (Factory New)', img: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PLFTi5B7dCzh7-JhfbiPITdn2xZ_Pp9i_vG8MKji1a1_0VqamymI4LEelRrNFHT-ATvyO680Me-uMjIzXQw6HV04CragVXp1igFofN6', color: 'eb4b4b', price: 23.23}],
            "userId": "668760",
            "caseName": "10% Nike vIRL Box",
            "caseImg": "https://static.wax.io/d-img/dynamic-apps/img/zrep-nike-only-05f1119352.png/300x300",
            "allItems": testBoxesTopWins.results.map(function(item) { return {name: item.itemName, img: item.itemImg, color: 'eb4b4b', price: 12.12}}),
            "userName": "DPG (ಠ_ಠ)",
            "userImg": "https://steamcdn-a.opskins.media/steamcommunity/public/images/avatars/35/35485ccb21fdfdf87f03f4cd2167f61368919117_full.jpg"
          },
          {
            "caseId": 10011,
            "id": "1a297d3a-f09d-4c66-8a6b-5c5f0f6879f4",
            "time": "2019-02-27T12:14:35.600Z",
            "unboxedItems": [{name: '★ StatTrak™ Flip Knife | Fade (Factory New)', img: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJD7eOwlYSOqPv9NLPF2DMAucMpj7HA897w2ATi_EY_Y230dY_Gc1M3N1jUqAPrxL-80J6_7pzXiSw05jfk9VU', color: 'eb4b4b', price: 239.23}],
            "userId": "668760",
            "caseName": "10% Nike vIRL Box",
            "caseImg": "https://static.wax.io/d-img/dynamic-apps/img/zrep-nike-only-05f1119352.png/300x300",
            "allItems": testBoxesTopWins.results.map(function(item) { return {name: item.itemName, img: item.itemImg, color: 'eb4b4b', price: 12.12}}),
            "userName": "DPG (ಠ_ಠ)",
            "userImg": "https://steamcdn-a.opskins.media/steamcommunity/public/images/avatars/35/35485ccb21fdfdf87f03f4cd2167f61368919117_full.jpg"
          }], // one per player mapped
          '71864984384739831': [JSON.parse(JSON.stringify(testCaseOpening))],
          '76815355184739833': [JSON.parse(JSON.stringify(testCaseOpening))],
        },
        currentRound: 1,
        playerCount: 1,
        players: [
          {
            position: 0,
            name: 'Kira',
            img: '/img/censored_avatar.png',
            id: '76561199167061888',
            winnings: 2.23
          },
          {
            position: 1,
            name: 'Tom',
            img: 'http://www.petpaw.com.au/wp-content/uploads/2015/05/Polish-Hound.jpg',
            id: '71864984384739831',
            winnings: 3.00
          },
          {
            position: 2,
            name: 'Waiting for Challenger...',
            img: '',
            id: '',
            winnings: 0
          },
          {
            position: 3,
            img: "https://avatars.akamai.steamstatic.com/ab5d370adafbd1cc45bc158186fd71bbc7e51db9_full.jpg",
            name: 'Bob',
            id: '76815355184739833',
            winnings: 1.23
          },
          // {
          //   position: 3,
          //   img: "https://avatars.akamai.steamstatic.com/ab5d370adafbd1cc45bc158186fd71bbc7e51db9_full.jpg",
          //   name: 'Kira',
          //   id: '76561199167061888',
          //   winnings: 1.23
          // }
        ]
      };
  
      // $scope.caseBinding = {
      //   '76815355184739833': {},
      //   '71864984384739831': {},
      //   '76561199167061888': {}
      // };
      $scope.isReady = true;
    } else {
      // $scope.caseBinding = {};
      glob.get('/api/battles/i/' + gameId, {}, function(resp) {
        $scope.game = resp.game;
        battlesData.processListing($scope.game);
        // resp.game.players.forEach(function(player) {
        //   $scope.caseBinding[player.id] = {};
        // });
        $scope.isReady = true;
        if ($scope.game.state === 2) {
          // game is on going should spawn spinner
          if ($scope.game.currentRound < $scope.game.cases.length) {
            var currentPlayersOpening = $scope.game.players.map(function(player) {
              var opening = $.extend({}, $scope.game.openings[player.id][$scope.game.currentRound]);
              var removed = $scope.game.openings[player.id].pop();
              player.winnings = player.winnings - removed.totalWon;
              console.log('game in progress, openings: ', $scope.game.openings);
              return { id: player.id, position: player.position, opening: opening};
            });
            $timeout(function(){
              startCurrentRound(currentPlayersOpening);
            });
            
          } 
        }
        // $scope.$apply();
      }, function(err) {
        $scope.state.go('app.battles.listings');
      });
    }
    socket.emit('sub', gameId, function(err) {
      if (err) {
        console.log('error subbing to', gameId, err);
      } else {
        console.log('subbed to', gameId);
      }
    });

    var openingQueue = [];
    var isSpinning = false;
    var waitingTimeout;

    battlesData.setCurrentGameView(gameId);

    socket.on('ba_o', function(data) {
      console.log('ba_o time:', Date.now(), data);
      if ($scope.isReady && $scope.game.state === 2) {
        $scope.game.currentRound = data.currentRound;
        // data.currentPlayersOpening.forEach(function(currentPlayerOpening) {
        //   $scope.game.openings[currentPlayerOpening.id].push(currentPlayerOpening.opening);
        // });
        // $scope.$apply();
        startCurrentRound(data.currentPlayersOpening);
      } else {
        console.log('ba_o received when game is not ready', data);
        console.log('ba_o game state: ', $scope.game.state);
      }
    });

    socket.on('ba', function(game) {
      var existingOpenings;
      if (game.state === 3) {
        // back up existing openings since this is completion state
        existingOpenings = $scope.game.openings;
      }
      // else {
      //   game.players.forEach(function(player) {
      //     if (!$scope.caseBinding[player.id] || !$scope.caseBinding[player.id].seed) {
      //       $scope.caseBinding[player.id] = {};
      //     }
      //   });
      // }
      $scope.game = game;
      battlesData.processListing($scope.game);
      if (existingOpenings) {
        $scope.game.openings = existingOpenings;
      }
      // $scope.$apply();
    });

    function startCurrentRound(currentPlayersOpening) {
      if (isSpinning || waitingTimeout) {
        openingQueue.push(currentPlayersOpening);
        return;
      }
      isSpinning = true;
      console.log('scope.game.openings: ', $scope.game.openings);
      // currentPlayersOpening.forEach(function(currentPlayerOpening) {
      //   currentPlayerOpening.opening = casesData.unwrapUnboxing([currentPlayerOpening.opening]);
      // });

      currentPlayersOpening.forEach(function (currentPlayerOpening) {
        startUnboxing(currentPlayerOpening.id, currentPlayerOpening.position, currentPlayerOpening.opening);
      });
    }

    function startUnboxing(playerId, position, unboxing) {
      console.log('bindings: ', $scope.caseBindings[position]);
      console.log('startUnboxing. playerId:', playerId, 'unboxing:', unboxing);
      $scope.caseBindings[position].seed(unboxing.id);
      var spinDelay = 1200;
      var startTs = new Date().valueOf();
      $scope.caseBindings[position].loadItems(unboxing.allItems, function () {
        var now = new Date().valueOf();
        var delay = now - startTs + spinDelay;
        $timeout(function () {
          $scope.caseBindings[position].spin(unboxing.unboxedItems, null, function () {
            spinOverCallback(unboxing, playerId);
          });
        }, delay);
      });
    };

    function spinOverCallback(unboxing, playerId) {
      console.log('unboxing done for ', unboxing.id);
      $scope.game.players.forEach(function (player) {
        if (player.id === playerId) {
          player.winnings += unboxing.totalWon;
        }
      });
      $scope.game.openings[playerId].push(unboxing);
      $scope.$apply();
      if (openingQueue.length > 0) {
        waitingTimeout = $timeout(function(){
          isSpinning = false;
          startCurrentRound(openingQueue.shift());
          waitingTimeout = null;
        }, 1000);
      } else {
        isSpinning = false;
      }
    }

    $scope.callBot = function(position) {
      console.log('callBot on position:', position);
      glob.post('/api/battles/callbot', { gameId: gameId, position: position}, function(resp) {
        glob.printsuccess('battles.bot-called');
        ga('send', 'event', 'battles', 'bot_called', $scope.game.cost);
      }, function (err) {
        console.log('battles callbot error: ', err);
      });
    };

    $scope.cancelBattle = function() {
      console.log('cancel battle called');
      if ($scope.game.playerCount > 1 || $scope.game.state !== 0) {
        glob.printwarning('battles.no_cancel');
      } else {
        glob.post('/api/battles/cancel', { gameId: gameId }, function (resp) {
          glob.printsuccess('battles.cancelled', 4000);
          ga('send', 'event', 'battles', 'cancelled', $scope.game.cost);
          $scope.state.go('app.battles.listings');
        }, function(err) {
          console.log('battles cancel error: ', err);
        })
      }
    };

    $scope.joinBattle = function(position) {
      console.log('join battle on position: ', position);
      glob.post('/api/battles/join', {gameId: gameId, position: position}, function(resp) {
        glob.printsuccess('battles.joined', null, 3000)
        ga('send', 'event', 'battles', 'join', $scope.game.cost);
      }, function(err) {
        console.log('join battles err: ', err);
      });
    };

    $scope.createSameBattle = function() {
      console.log('create same battle clicked');
      var mode = $scope.game.mode;
      var playerLimit = $scope.game.playerLimit;

      if ($rootScope.user.balance < $scope.game.cost) {
        printNoBalance();
        return;
      }
      var casesAndQuantitiesMap = $scope.game.cases.reduce(function(memo, caseInfo) {
        if (!memo[caseInfo.id]) {
          memo[caseInfo.id] = 1;
        } else {
          memo[caseInfo.id]++;
        }
        return memo;
      }, {});
      var casesAndQuantities = Object.keys(casesAndQuantitiesMap).map(function (id) {
        return { id: Number(id), quantity: casesAndQuantitiesMap[id] };
      });
      glob.post('/api/battles/create',
        {
          mode: mode, playerLimit: playerLimit, casesAndQuantities: casesAndQuantities,
          private: $scope.game.private, jinxed: $scope.game.jinxed
        }, function(resp) {
        var gameId = resp.results;
        $scope.state.go('app.battles.game', { id: gameId });
      }, function(err) {

      });
    };

    $scope.playerIsInGame = function() {
      if ($rootScope.user.id) {
        return $scope.game.players.find(function(player) {
          return player.id === $rootScope.user.id;
        });
      } else {
        return false;
      }
    };

    $scope.shareToChat = function() {
      console.log('shareToChat clicked');
      if (!$rootScope.user.id) {
        glob.printwarning('app.login_required');
        return;
      }
      if (!$scope.playerIsInGame()) {
        glob.printwarning('battles.share_players_only');
        return;
      }
      glob.post('/api/battles/share', { gameId: gameId }, function(resp) {
        glob.printsuccess('battles.chat_shared', null, 3000);
        ga('send', 'event', 'battles', 'chat_share', $scope.game.cost);
      }, function (err) {
        console.log('battles share error: ', err);
      });
    };

    function replayNextRound() {
      console.log('replay round: ', $scope.game.currentRound);
      if ($scope.game.currentRound < $scope.game.cases.length) {
        var currentPlayersOpening = $scope.game.players.map(function(player) {
          return { id: player.id, position: player.position, opening: $scope.replayOpenings[player.id][$scope.game.currentRound]};
        });
        startCurrentRound(currentPlayersOpening);
        setTimeout(function() {
          $scope.game.currentRound++;
          replayNextRound();
        }, 12000);
      } else {
        $scope.game.currentRound = $scope.game.cases.length - 1;
        $scope.game.state = 3;
      }
    };

    $scope.replayGame = function() {
      if ($scope.isReady) {
        $scope.replayOpenings = $.extend({}, $scope.game.openings);
        $scope.game.players.forEach(function(player) {
          $scope.game.openings[player.id] = [];
          player.winnings = 0;
        });
        $scope.isReplaying = true;
        $scope.game.currentRound = 0;
        $scope.game.state = 2;
        replayNextRound();
      }
    };


    $scope.particleItem = {
      color: '#FDE023'
    };

    $scope.$on('$destroy', function () {
      socket.emit('unsub', gameId, function(err) {
        if (err) {
          console.log('error unsubbing from', gameId, err);
        } else {
          console.log('unsubbed from', gameId);
        }
      });
      battlesData.setCurrentGameView(null);
    });

  });
