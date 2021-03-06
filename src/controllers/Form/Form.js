import NumericMask from '../../utils/NumericMask/NumericMask';
import Validate from '../../utils/Validate/Validate'
import Users from '../../models/Users/Users';

export default class Form {
  constructor(params = {}) {
    this.form = document.getElementById('form');
    this.inputs = this.form.querySelectorAll('input');
    this.submitButton = this.form.querySelector('button');
    this.mask = new NumericMask(this.inputs);
    this.validate = new Validate(this.inputs);

    if (params.cpf) {
      this.loadUsers(params.cpf);
    }

    this.bind();
  }

  bind() {
    this.form.addEventListener('keyup', this.validateForm.bind(this));
    this.form.addEventListener('submit', this.submitForm.bind(this));
  }

  async loadUsers(cpf) {
    const users = await new Users();
    const user = users.find(user => user.cpf === cpf);

    if (user) {
      this.editingUser = cpf;
      this.submitButton.querySelector('span').innerHTML = 'Editar';

      Object.entries(user).forEach(([key, value]) => {
        const input = Array.prototype.find.bind(this.inputs)(
          input => input.name === key
        );

        if (input) {
          const mask = input.getAttribute('data-mask');

          if (mask) {
            input.value = this.mask.applyMask(value, mask);
          } else {
            input.value = value;
          }
        }
      });

      this.validateForm();
    }
  }

  validateForm() {
    const isValid = Array.prototype.reduce.bind(this.inputs)(
      (result, input) => (result ? input.validity.valid : result),
      true
    );

    this.disabledButton(!isValid);
  }

  disabledButton(status) {
    if (status) {
      this.submitButton.setAttribute('disabled', true);
    } else {
      this.submitButton.removeAttribute('disabled');
    }
  }

  async submitForm(event) {
    event.preventDefault();
    this.submitButton.classList.add('loading')

    const users = await new Users();
    const user = Array.prototype.reduce.bind(this.inputs)((user, input) => {
      user[input.name] = input.getAttribute('data-mask')
        ? input.value.replace(/[^0-9]/g, '')
        : input.value;

      return user;
    }, {});

    if (this.editingUser) {
      const index = users.map(user => user.cpf).indexOf(this.editingUser);
      users[index] = user;
    } else {
      users.push(user);
    }

    setTimeout(() => {
      window.location.hash = '#list';
    }, 500);
  }
}