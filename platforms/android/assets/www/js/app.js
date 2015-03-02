// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('MainCtrl', function($scope, $ionicGesture) {
  
   
  // RAPID TEST - hence not the Angular way. This brute manipulation is here in the controller to test the speed of velocity.js within Ionic
  var isFwd = false;

  var win_height = window.innerHeight;
  var container = angular.element(document.querySelector('#container'));
  var bg_dof = angular.element(document.querySelector('.bg_dof'));
 
  $scope.y = 0;
  $scope.ny = 0;
  
  // These listeners could be registered like the multitouch one above. Here, testing the other way; from the html element itself. Most gestures are available this way - only multitouch events seem to be missing for some reason.
  $scope.onTouch = function(e){Velocity.mock = true;}
  $scope.onRelease = function(e){
    Velocity.mock = false;
    
    if($scope.ny > -(win_height/2)) {
      $scope.ny = 0;
    } else if($scope.ny < -(win_height/2)) {
      $scope.ny = -win_height+100;
    }
    $scope.decelerate();
  }  
   
  $scope.onDrag = function(ev){
    Velocity.mock = true;
    $scope.ny = $scope.y + ev.gesture.deltaY;
    Velocity(container, {
      translateY: $scope.ny
    });
    $scope.velocityY = ($scope.ny - $scope.lastY);
    $scope.lastY = $scope.ny;
    var dof_opacity = ($scope.ny-0)/(-win_height-1) * (1-0) + 0;
    Velocity(bg_dof, {
      opacity: dof_opacity
    });
    if($scope.ny > -(win_height/2)) {
      document.getElementById( 'to_splash' ).style.display = 'none';
      document.getElementById( 'to_menu' ).style.display = 'block';
    } else if($scope.ny < -(win_height/2)) {
      document.getElementById( 'to_splash' ).style.display = 'block';
      document.getElementById( 'to_menu' ).style.display = 'none';
    }
  }

  $scope.decelerate = function(){
    $scope.y = $scope.ny;
    Velocity(container, {
      translateY: $scope.y
    }, [200, 20]);
    var dof_opacity = ($scope.ny-0)/(-win_height-1) * (1-0) + 0;
    Velocity(bg_dof, {
      opacity: dof_opacity
    }, {duration: 100});
    return;
  }  
  
  // Animate full movement
  $scope.toggle = function(){
    if(isFwd) $scope.reverse()
    else $scope.play();
  }

  $scope.play= function(){
    $scope.y = -win_height;
    $scope.ny = -win_height; 
    $scope.stop();
    isFwd = true;
    Velocity(container, { 
      translateY: -win_height+100,
    }, [200, 20]);
    var dof_opacity = ($scope.ny-0)/(-win_height-1) * (1-0) + 0;
    Velocity(bg_dof, {
      opacity: dof_opacity
    }, {duration: 100});
    document.getElementById( 'to_splash' ).style.display = 'block';
    document.getElementById( 'to_menu' ).style.display = 'none';
  }

  $scope.stop= function(){
    isFwd = false;
    Velocity(container, "stop");
  }
  $scope.reverse= function(){
    $scope.y = 0;
    $scope.ny = 0;  
    $scope.stop();
    Velocity(container, {
      translateY: "0px"
    }, [200, 20]);
    var dof_opacity = ($scope.ny-0)/(-win_height-1) * (1-0) + 0;
    Velocity(bg_dof, {
      opacity: dof_opacity
    }, {duration: 100});
    document.getElementById( 'to_splash' ).style.display = 'none';
    document.getElementById( 'to_menu' ).style.display = 'block';
  }  
  
  $scope.page = function(i) {
    console.log(i);
    var page = angular.element(document.querySelector('#page_'+ i));
    Velocity(page, {
      left: 0
    }, {
      display: 'block',
      easing: [200, 20]
    });
  }
  $scope.back = function(i) {
    console.log(i);
    var page = angular.element(document.querySelector('#page_'+ i));

    Velocity(page, {
      left: '100%'
    }, {
      display: 'none',
      easing: [200, 20]
    });
  }
});
