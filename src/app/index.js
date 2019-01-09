import angular      from 'angular';
import uiRouter     from 'angular-ui-router';
import Components   from './components';
import AppComponent from './app.component';
import RestService from './services/rest.service';
import DialogDirective from './directives/dialog/dialog.directive';

angular.module('app', [
    uiRouter,
    Components,
  ])
  .config(["$locationProvider", ($locationProvider) => {
    $locationProvider.html5Mode(true).hashPrefix('!');
  }])
  .service('RestService', RestService)
  .directive('dialogDirective', DialogDirective.createInstance)
  .component('app', AppComponent);
