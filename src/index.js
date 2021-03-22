import './index.scss';

import Router from './utils/Router/Router';
import Form from './controllers/Form/Form'
import List from './controllers/List/List'

new Router([
  {
    path: '/',
    template: 'form-template',
    exact: true,
    controller: Form
  },
  {
    path: 'edit/:cpf',
    template: 'form-template',
    controller: Form
  },
  {
    path: 'list',
    template: 'list-template',
    controller: List
  }
]);
