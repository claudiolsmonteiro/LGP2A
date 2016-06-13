// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var myApp = angular.module('starter', ['ionic','blank.controllers', 'ngCordovaBeacon']);

myApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

myApp.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.views.maxCache(1);

    // --- native scrolling ---
    $ionicConfigProvider.scrolling.jsScrolling(false);
    // Or for only a single platform, use
    // if( ionic.Platform.isAndroid() ) {
    // $ionicConfigProvider.scrolling.jsScrolling(false);
    // --- end native scrolling ---

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

        /*.state('model', {
        url: '/model/{current_room:(?:/[^/]+)?}',
        templateUrl: 'templates/tridimensional-model.html',
        controller:"tridimensionalModelController"
        })*/

        //model with parameter to animate current room
    .state('model_current', {
        url: '/model/:current_room',
        templateUrl: 'templates/tridimensional-model.html',
        controller:"tridimensionalModelController"
    })

        //model with no room "highlighted"
    .state('model', {
        url: '/model',
        templateUrl: 'templates/tridimensional-model.html',
        controller:"tridimensionalModelController"
    })

    .state('room', {
        url: '/room/:room',
        templateUrl: 'templates/room.html',
        controller:"roomController"/*,
        cache: false*/
    })

    .state('panoramic', {
      url: '/panoramic/:room',
      templateUrl: 'templates/360.html',
      controller:"panoramaController"
    })

    .state('materials', {
      url: '/materials/:room',
      templateUrl: 'templates/materials.html',
      controller:"materialsController"
    })

    .state('contacts', {
        url: '/contacts',
        templateUrl: 'templates/contactos.html',
        controller:"contactsController"
    })

    .state('local', {
        url: '/local',
        templateUrl: 'templates/local.html',
        controller:"localController"
    })

    .state('language', {
        url: '/language',
        templateUrl: 'templates/language.html',
        controller:"languageController"
    });



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/model');

});
