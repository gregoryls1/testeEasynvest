import Validate from './Validate';

describe('Validate Class', () => {
  beforeEach(() => {
    const input = document.createElement('input');

    input.className = 'form-input';
    input.setAttribute('required', true);
    input.type = 'text';

    document.body.appendChild(input);
  });

  afterEach(() => {
    const message = document.body.querySelector('.message-error');
    document.body.querySelector('input').remove();

    if (message) {
      message.remove();
    }
  });

  test('Add danger class to input on validation error', () => {
    const input = document.body.querySelector('.form-input');

    new Validate([input]);

    input.dispatchEvent(new Event('blur'));

    expect(input.className).toBe('invalid');
  });

  test('Remove danger class from input on validation error', () => {
    const input = document.body.querySelector('.form-input');

    input.className = 'invalid';
    input.value = 'test';

    new Validate([input]);

    input.dispatchEvent(new Event('blur'));

    expect(input.className).toBe('form-input');
  });

  test('Create message div if data attribute exists', () => {
    const input = document.body.querySelector('.form-input');

    input.setAttribute('data-valueMissing', 'This field is required');
    new Validate([input]);

    input.dispatchEvent(new Event('blur'));

    expect(
      input.parentNode.querySelector('.message-error')
    ).not.toBeNull();
  });

  test('Show custom error message from data-attribute', () => {
    const input = document.body.querySelector('.form-input');

    input.setAttribute('data-valueMissing', 'This field is required');
    new Validate([input]);

    input.dispatchEvent(new Event('blur'));

    expect(
      input.parentNode.querySelector('.message-error').innerHTML
    ).toBe('This field is required');
  });
});
