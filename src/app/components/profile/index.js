import angular from 'angular';
import uiRouter from 'angular-ui-router';
import profileComponent from './profile.component';

const profileModule = angular.module('profile', [
  uiRouter
])

.config(['$stateProvider', ($stateProvider) => {
  $stateProvider
    .state({
      url: '/profile/:id',
      component: 'profile',
      name: 'profile'
    });
}])

.component('profile', profileComponent).name;

export default profileModule;
