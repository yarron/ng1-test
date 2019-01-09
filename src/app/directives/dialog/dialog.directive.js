var _restService = new WeakMap();
import './dialog.css';

export default class DialogDirective {
    constructor(RestService) {
        _restService.set(this);
        this.restService = RestService
        this.restrict = 'AE';
        this.template = require('./dialog.html');
        this.scope = {
          statusAdd: '=',
          statusRemove: '=',
          id: '='
        };
        this.controller = ['$scope', ($scope) => {
            this.scope = $scope;
            this.scope.contact = {}
        }];
    }

    link(scope) {
      this.scope.statusAdd = false;
      this.scope.statusRemove = false;
      scope.addContact = this.addContact.bind(this);
      scope.removeContact = this.removeContact.bind(this);
      scope.cancel = this.cancel.bind(this);
    }

    addContact(contact = {}, form) {
      const fioArr = contact.fio ? contact.fio.split(' ') : [];

      const data = {
        lastname: fioArr[0] || '',
        firstname: fioArr[1] || '',
        middlename: fioArr[1] || '',
        phone: contact.phone || '',
        email: contact.email || '',
        avatar: contact.email || '',
      }

      this.restService.addContact(data);
      this.cancel(form);
    }

    removeContact(id) {
      this.restService.removeContact(id);
      this.cancel();
    }

    cancel(form) {
      if (form) {
        form.$setPristine();
        form.$setUntouched();
        this.scope.contact = angular.copy({});
      }
      this.scope.statusAdd = false;
      this.scope.statusRemove = false;
    }

    static createInstance(RestService) {
        'ngInject';
        DialogDirective.instance = new DialogDirective(RestService);
        return DialogDirective.instance;
    }
}
