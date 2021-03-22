export default class Users {
  constructor() {
    return this.build();
  }

  async build() {
    const storageData = localStorage.getItem('users');

    if (!storageData) {
      const request = await fetch(
        'https://private-21e8de-rafaellucio.apiary-mock.com/users',
      );
      const users = await request.json();
      this.storageUpdate(users);
    
      return this.createProxy(users);
    } else {
      const users = JSON.parse(storageData);

      return this.createProxy(users);
    }
  }

  createProxy(users) {
    return new Proxy(users, {
      set: this.set.bind(this)
    });
  }

  storageUpdate(users) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  set(users, prop, value) {
    const hasSet = Reflect.set(users, prop, value);

    this.storageUpdate(users);

    return hasSet;
  }
}
