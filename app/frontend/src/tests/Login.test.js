import { render, screen } from '@testing-library/react';
import App from '../App';
import React from 'react';

describe('Testa a pagina de Login', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('Input de usuario existe na pagina', () => {
    const userLogin = screen.getByTestId('userLoginInput');
    expect(userLogin).toBeInTheDocument();
  });

  it('Input de senha existe na pagina', () => {
    const passwordInput = screen.getByTestId('passwordLoginInput');
    expect(passwordInput).toBeInTheDocument();
  });
});
