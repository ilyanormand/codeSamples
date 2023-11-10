angular.module('battlesListings.controller', [])

  .controller('battlesListings.controller', function ($window, $location, $filter, $timeout, $scope, $rootScope, $translate, battlesData, glob, casesData) {

    $scope.battlesData = battlesData;
    $rootScope.pageTitle = 'CSGOBIG - Case Battles';
    
    $scope.view = 'listings';

    $scope.priceRanges = [{
      tag: "Show All",
      limits: [0, Infinity]
    }, {
      limits: [0, 1]
    }, {
      limits: [1, 10]
    }, {
      limits: [10, 50]
    }, {
      limits: [50, 100]
    }, {
      limits: [100, 250]
    },
    {
      tag: "250+",
      limits: [250, Infinity]
    }];

    $scope.playerSelections = [
      {
        mode: 'ffa',
        playerLimit: 2,
        players: Array.from({ length: 2 }, function (_, i) {
          return {
            position: i,
            name: '',
            img: '',
            id: ''
          };
        })
      },
      {
        mode: 'ffa',
        playerLimit: 3,
        players: Array.from({ length: 3 }, function (_, i) {
          return {
            position: i,
            name: '',
            img: '',
            id: ''
          };
        })
      },
      {
        mode: 'ffa',
        playerLimit: 4,
        players: Array.from({ length: 4 }, function (_, i) {
          return {
            position: i,
            name: '',
            img: '',
            id: ''
          };
        })
      },
      {
        mode: 'team',
        playerLimit: 4,
        players: Array.from({ length: 4 }, function (_, i) {
          return {
            position: i,
            name: '',
            img: '',
            id: ''
          };
        })
      },
    ];
    $scope.selectedMode = $scope.playerSelections[0];
    $scope.selectedCases = [];

    $scope.setPlayerSelection = function (playerSelection) {
      $scope.selectedMode = playerSelection;
      console.log('selected: %o', $scope.selectedMode);
    };

    $translate("coinflip.show_all").then(function (text) {
      $scope.priceRanges[0].tag = text;
    });

    $scope.filter = {};

    $scope.$watch("view", function (view) {
      $scope.filter.priceRange = $scope.priceRanges[0];
      $scope.filter.order = "desc";
      if (view === 'listings') {
        battlesData.loadListings();
      } else if (view === 'history') {
        battlesData.loadHistory();
      }
    });

    battlesData.loadListings();

    var historyLoaded = false;
    $scope.$on('battlesUpdated', function() {
      $scope.listings = battlesData.getListings(20, 100);
      console.log('listings updated: ', $scope.listings);
      if ($scope.listings.length < 20 && !historyLoaded) {
        battlesData.loadHistory();
      }
      // findMyListings();
    });

    $scope.$on("battlesHistoryUpdated", function() {
      $scope.history = battlesData.getHistory();
      if (!historyLoaded && $scope.listings.length < 20) {
        $scope.listings = battlesData.getListings(20, 100);
      }
      historyLoaded = true;
    });

    $scope.filterListings = function (listing) {

      var tabCheck = ($scope.view !== "mylistings" || listing.me);
      var priceRangeCheck = true;
      if ($scope.view == "listings") {
        var pr = $scope.filter.priceRange;
        if (pr) {
          if (!listing.cost) priceRangeCheck = true
          else priceRangeCheck = glob.inRange(listing.cost, pr.limits[0], pr.limits[1]);
        }
      }
      return tabCheck && priceRangeCheck;
    }

    $scope.listingComparator = function(x, y) {
      var a = x.value;
      var b = y.value;
      if ((a.state === 3 || a.state === 4) && (b.state !== 3 && b.state !== 4)) {
        return -1;
      } else if ((b.state === 3 || b.state === 4) && (a.state !== 3 && a.state !== 4)) {
        return 1;
      } else {
        return a.cost < b.cost ? -1 : 1;
      }
    };

    function findMyListings() {
      $scope.myListings = [];
      $scope.listings.forEach(function(listing) {
          if (listing.me) $scope.myListings.push(listing);
      });
    }

    $scope.openCaseSelect = function () {
      $rootScope.openBattlesCaseSelect(function (selectedCases) {
        if (selectedCases) {
          $scope.selectedCases = selectedCases;
        }
      }, $scope.selectedCases);
    };

    function printNoBalance() {
      var instance = glob.printwarning('vgocases.not_enough_balance');
      if (!instance) return;
      instance.onclick = function(ele) {
        $rootScope.openMarket('exchange');
        instance.destroy();
      };
    };

    $scope.getCost = function () {
      return $scope.selectedCases.reduce(function(total, selectedCase) {
        return total + selectedCase.cost * selectedCase.fe_quantity;
      }, 0);
    };

    $scope.private = false;
    $scope.jinxed = false;
    
    $scope.togglePrivate = function() {
      $scope.private = !$scope.private;
    };
    $scope.toggleJinxed = function() {
      $scope.jinxed = !$scope.jinxed;
    };

    $scope.instantCreate = function () {
      console.log('selectedMode: ', $scope.selectedMode);
      console.log('selectedCases: ', $scope.selectedCases);
      var mode = $scope.selectedMode.mode;
      var playerLimit = $scope.selectedMode.playerLimit;
      if ($scope.selectedCases.length === 0) {
        glob.printwarning('battles.no-cases');
        return;
      }
      if ($rootScope.user.balance < $scope.getCost()) {
        printNoBalance();
        return;
      }
      var casesAndQuantities = $scope.selectedCases.map(function(selectedCase) {
        return { id: selectedCase.id, quantity: selectedCase.fe_quantity };
      });
      glob.post('/api/battles/create',
        { mode: mode,
          playerLimit: playerLimit,
          casesAndQuantities: casesAndQuantities,
          private: $scope.private,
          jinxed: $scope.jinxed
        }, function(resp) {
        var gameId = resp.results;
        $scope.state.go('app.battles.game', { id: gameId });
      }, function(err) {

      });
    }

    $scope.playerIsInGame = function(game) {
      if ($rootScope.user.id) {
        return game.players.find(function(player) {
          return player.id === $rootScope.user.id;
        });
      } else {
        return false;
      }
    };

    battlesData.subListings();
    casesData.subCaseData();

    $scope.$on('recentCasesUpdated', function() {
      $scope.caseHistory = casesData.caseHistory;
      $scope.stats = casesData.stats;
      $scope.topOpening = casesData.topOpening;
    });

    if (casesData.caseHistory.length === 0) {
      casesData.loadRecent();
    } else {
      $scope.caseHistory = casesData.caseHistory;
			$scope.stats = casesData.stats;
			$scope.topOpening = casesData.topOpening;
    }

    $scope.$on('$destroy', function () {
      battlesData.unsubListings();
      casesData.unsubCaseData();
    });

    $scope.gameModeTooltip = '<b>1v1</b> - You are facing one other player (or bot)<br/><b>1v1v1</b> - Free for all between 3 players (or bots)<br/><b>1v1v1v1</b> - Free for all between 4 players (or bots)<br/><b>2v2</b> - Team battle between players (or bots)';

    // // TESTING
    // window.nextbox = function () {
    //   $scope.listings.forEach(function (listing) {
    //     if (listing.state === 1) {
    //       if (Object.keys(listing.openings).length < listing.cases.length) {
    //         listing.openings[listing.players[0].id].push({});
    //         console.log('push');
    //       }
    //       var curPos = listing.openings[listing.players[0].id].length;
    //       listing.cases[curPos - 1].current = false;
    //       listing.cases[curPos].current = true;
    //     }
    //   });
    // }
  });
