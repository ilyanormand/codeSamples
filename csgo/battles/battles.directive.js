angular.module('battles.directive', [])

  .directive('playerList', function () {
    return {
      restrict: 'A',
      templateUrl: 'battles/partials/player_list.tpl.html',
      scope: {
        game: '<',
        showTooltip: '<'
        // mode: "=",
        // playerLimit: "="
      },
      link: function (scope, el, attr) {
        if (!scope.game) {
          console.log('no scope.game in playerList:', scope);
          return;
        }
        if (scope.game.players.length < scope.game.playerLimit) {
          scope.game.players.sort(function(a, b) { return a.position - b.position; });
          for (var i = 1; i < scope.game.playerLimit; i++) {
            if (i >= scope.game.players.length || scope.game.players[i].position !== i) {
              scope.game.players.splice(i, 0, {
                position: i,
                name: 'Empty Slot',
                img: '',
                id: ''
              });
            }
          }
        }

        if (!scope.showTooltip) {
          return;
        }
        if (scope.game.mode === 'team') {
          scope.tooltip = '2v2';
        } else if (scope.game.mode === 'ffa') {
          scope.tooltip = '1';
          for (var i = 1; i < scope.game.playerLimit; i++) {
            scope.tooltip += 'v1';
          }
        }
        return;
        console.log('link. scope: ', scope);
        if (!scope.game && scope.mode && scope.playerLimit) {
          scope.game = {
            mode: scope.mode,
            playerLimit: scope.playerLimit,
            players: Array.from({ length: scope.playerLimit }, function (_, i) {
              return {
                position: i,
                name: 'Empty Slot',
                img: '',
                id: ''
              };
            })
          };
          console.log('link game: %o', scope.game);
        }
      }
    }
  }).directive('battlePlayerView', function ($rootScope) {

    return {
      restrict: "E",
      templateUrl: "battles/partials/player_view.tpl.html",
      scope: {
        game: '<',
        player: '<',
        caseBindings: '='
      },
      link: function (scope, el, attr) {
        if (scope.game.playerLimit === 2) {
          if (scope.player.position === 0) {
            scope.player_info_class = 'player_info player_info_center';
          } else {
            scope.player_info_class = 'player_info_right player_info_center';
          }
        } else if (scope.game.playerLimit === 3) {
          if (scope.player.position === 0 || scope.player.position === 1) {
            scope.player_info_class = 'player_info player_info_center';
          } else {
            scope.player_info_class = 'player_info_right player_info_center';
          }
        } else {
          if (scope.player.position === 0 || scope.player.position === 1) {
            scope.player_info_class = 'player_info player_info_center';
          } else if (scope.player.position === 2 || scope.player.position === 3) {
            scope.player_info_class = 'player_info_right player_info_center';
          }
        }
        if ($rootScope.user && $rootScope.user.id) {
          scope.creator = scope.game.creator === $rootScope.user.id;
          scope.playerInGame = scope.game.players.find(function (player) {
            return player.id === $rootScope.user.id;
          });
        }
        // scope.$watch('gameReady', function(ready) {
        //   if (ready) {
        //     console.log('init');
        //     scope.$parent.init();
        //   }
        // });
      },
    }
  }).directive('battlePlayerDataView', function () {
    return {
      restrict: "E",
      templateUrl: "battles/partials/player_data_view.tpl.html",
      scope: {
        openings: '=',
        player: '<',
        roundLimit: '<',
        playerLimit: '<'
      },
      link: function (scope, el, attr) {
        // scope.normalizedItems = function() {
        //   console.log('directive normalized');
        //   return scope.openings.map(function (opening) {
        //     console.log('directive openings: ', opening);
        //     return opening.unboxedItems[0];
        //   });
        // };
        scope.$watchCollection('openings', function(openings) {
          console.log('$watch openings', openings);
          scope.normalizedItems = scope.openings.map(function (opening) {
            return opening.unboxedItems[0];
          });
        });
      }
    }
  });
