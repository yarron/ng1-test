export default class HomeController {
  constructor(RestService, $scope, $location) {
    'ngInject';
    this.restService = RestService;
    this.scope = $scope;
    this.location = $location;
    this.scope.dialogAddStatus = false;
    this.scope.dialogRemoveStatus = false;
    this.scope.contacts = [];
    this.scope.contactId = -1;
  }

  $doCheck() {
      if (this.scope.contacts.length !== this.restService.getContactsCache()) {
        this.scope.contacts = this.restService.getContactsCache()
      }
  }

  $onInit() {
    this.restService.getContacts()
      .then((contacts) => {
        this.scope.contacts = contacts;
      })

    this.scope.openProfile = this.openProfile.bind(this);
    this.scope.addProfile = this.addProfile.bind(this);
    this.scope.removeProfile = this.removeProfile.bind(this);
  }

  openProfile(id) {
    this.location.path(`profile/${id}`);
  }

  addProfile() {
    this.scope.dialogAddStatus = true;
    this.scope.contactId = 0;
  }

  removeProfile(id) {
    this.scope.dialogRemoveStatus = true;
    this.scope.contactId = id;
  }
}
