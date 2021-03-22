import Users from './Users';
import { apiMock } from '../../helpers/apiMock';

global.fetch = apiMock

describe('Users Model Class', () => {
  afterEach(() => {
    localStorage.removeItem('users');
  });

  test('Expect to constructor returns a promise with users data', async () => {
    const users = await new Users();

    expect(users).toEqual([
      {
        name: 'My name 1',
        cpf: '04080757247',
        phone: '11987654321',
        email: 'myemail1@test.com.br'
      },
      {
        name: 'My name 2',
        cpf: '77797584192',
        phone: '11987654321',
        email: 'myemail2@test.com.br'
      },
      {
        name: 'My name 3',
        cpf: '45486737688',
        phone: '11987654321',
        email: 'myemail3@test.com.br'
      }
    ]);
  });

  test('Expect that any changes to users updates localStorage data', async () => {
    const users = await new Users();

    users.push('test');
    const storageData = JSON.parse(localStorage.getItem('users'));

    expect(storageData[3]).toBe('test');
  });
});
