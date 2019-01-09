import angular from 'angular';
import Home from './home';
import Profile from './profile';

const componentModule = angular.module('app.components', [
  Home,
  Profile,
])
.name;

export default componentModule;
