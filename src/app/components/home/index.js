import angular from 'angular';
import uiRouter from 'angular-ui-router';
import homeComponent from './home.component';

const homeModule = angular.module('home', [
  uiRouter
])

.config(['$stateProvider', ($stateProvider) => {
  $stateProvider
    .state({
      url: '/',
      component: 'home',
      name: 'home'
    });
}])

.component('home', homeComponent).name;

export default homeModule;
