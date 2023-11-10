angular.module('battles.config', [])

.config(function($locationProvider, $urlRouterProvider, $stateProvider) {
  $stateProvider
    .state('app.battles', {
      url: '/battles',
      templateUrl: 'battles/views/battles.tpl.html',      
      abstract: true
    })
    .state('app.battles.listings', {
      url: '/listings',
      templateUrl: 'battles/views/battles-listings.tpl.html',
      controller: 'battlesListings.controller',
    })
    .state('app.battles.game', {
      url: '/game/:id',
      templateUrl: 'battles/views/battles-game.tpl.html',
      controller: 'battlesGame.controller',
      params: {listing: listing}
    })
    
});