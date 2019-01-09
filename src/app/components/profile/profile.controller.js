export default class ProfileController {
  constructor(RestService, $scope, $stateParams ) {
    'ngInject';
    this.restService = RestService;
    this.scope = $scope;
    this.id = $stateParams.id;
  }

  $onInit() {
    this.restService.getContact(Number(this.id)).then(contact => {
      this.scope.contact = contact;
    });
  }
}
