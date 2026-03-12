import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage';
import store from '../../app/store';

test('should allow user to type email and password', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    </Provider>
  );

  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');

  fireEvent.change(emailInput, { target: { value: 'test@mail.com' } });
  fireEvent.change(passwordInput, { target: { value: '123456' } });

  expect(emailInput.value).toBe('test@mail.com');
  expect(passwordInput.value).toBe('123456');
});
