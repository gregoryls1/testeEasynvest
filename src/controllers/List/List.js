import Users from '../../models/Users/Users';

export default class List {
  constructor() {
    this.container = document.querySelector('.container.list');
    this.userList = document.getElementById('list-user');

    this.loadUsers();
  }

  async loadUsers() {
    const users = await new Users();
    const rows = this.container.querySelectorAll('.row');

    if (rows.length > 1) {
      rows.forEach(row => {
        if (row.className.indexOf('header') === -1) {
          row.remove();
        }
      });
    }

    users.forEach(user => {
      const row = document.importNode(this.userList.content, true);
      const cols = row.querySelectorAll('.column');

      row
        .querySelector('.btn-edit')
        .setAttribute('href', `#edit/${user.cpf}`);


      Object.entries(user).forEach(([key, value]) => {
        Array.prototype.find.bind(cols)(
          col => col.className.indexOf(key) > -1
        ).innerHTML = value;
      });

      this.container.appendChild(row);
    });
  }
}