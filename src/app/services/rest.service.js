export default class RestService {
  constructor($http) {
    'ngInject';
    this.http = $http;
  }

  addContact(contact) {
    this.getContacts().then(contacts => {
      contact.id = this.getUniqueId(contacts)

      this.http.post('_data/contacts-post.json', contact);

      // тут вообще-то нужно дождаться ответа, и только потом сохранять контакт
      RestService.contactsCache.push(contact);
      RestService.contactsCache.sort(RestService.sortLastname);
    });

  }

  removeContact(id) {
    this.http.post('_data/contacts-remove.json', id);

    // тут вообще-то нужно дождаться ответа, и только потом сохранять контакт
    RestService.contactsCache = RestService.contactsCache.filter(contact => contact.id !== id);
  }

  getUniqueId(contacts) {
    return Math.max(...contacts.map(contact => contact.id).sort()) + 1;
  }

  getContactsCache() {
    return RestService.contactsCache;
  }

  getContacts() {
    if (RestService.contactsCache.length) {
      return Promise.resolve(RestService.contactsCache);
    }
    return this.http({
        method: 'GET',
        url: require('_data/contacts.json'),
    })
    .then(
      results => {
        RestService.contactsCache = results.data.sort(RestService.sortLastname);
        return RestService.contactsCache;
      },
      error => {
        console.error(`Ошибка получения данных: ${error}`);
      })
  }

  getContact(id) {
    if (RestService.contactsCache.length && id) {
      return Promise.resolve(RestService.contactsCache.find(contact => contact.id === id));
    } else {
      return this.getContacts()
        .then((contacts => contacts.find(contact => contact.id === id)))
    }
  }

  static sortLastname (a, b) {
    if (a.lastname > b.lastname) {
      return 1;
    }

    if (a.lastname < b.lastname) {
      return -1;
    }

    return 0;
  }
}

RestService.contactsCache = [];
