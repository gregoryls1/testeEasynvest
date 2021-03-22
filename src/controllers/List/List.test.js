import List from './List';
import { apiMock } from '../../helpers/apiMock';
import Users from '../../models/Users/Users';

global.fetch = apiMock;

describe('List Controller Class', () => {
  beforeEach(() => {
    const container = document.createElement('div');
    const userList = document.createElement('template');
    const template = document.createElement('template');

    container.className = 'container list';

    userList.id = 'list-user';
    template.id = 'list-template';

    template.innerHTML = `
    <div class="container list table-container">
      <div class="row header">
        <div class="list-title">Nome</div>
        <div class="list-title">E-mail</div>
        <div class="list-title">CPF</div>
        <div class="list-title">Telefone</div>
        <div class="list-title edit">
        </div>
      </div>
    </div>
    `;

    userList.innerHTML = `
        <div class="row">
          <div class="column name"></div>
          <div class="column email"></div>
          <div class="column cpf"></div>
          <div class="column phone"></div>
          <div class="column-wrap">
            <a href="#edit" class="btn-edit">Editar</a>
          </div>
        </div>
    `;

    document.body.appendChild(userList);
    document.body.appendChild(container);
  });

  afterEach(() => {
    const container = document.body.querySelector('.container');
    const userList = document.body.querySelector('#list-user');

    container.remove();
    userList.remove();

    localStorage.removeItem('users');
  });

  test('Expect to render data on load', async () => {
    const list = new List();
    await list.loadUsers();

    const rows = document.querySelectorAll('.row');

    expect(rows.length).toBe(3);
  });

  test('Expect to update data on every load', async () => {
    const list = new List();
    await list.loadUsers();

    const users = await new Users();

    users.push({
      name: 'My name 4',
      cpf: '74668869066',
      phone: '11987654321',
      email: 'myemail4@test.com.br'
    });

    await list.loadUsers();

    const rows = document.querySelectorAll('.row');

    expect(rows.length).toBe(4);
  });
});