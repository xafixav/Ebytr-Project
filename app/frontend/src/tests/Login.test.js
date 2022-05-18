import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import React from 'react';
import userEvent from '@testing-library/user-event';

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

  it('Botao de Login deve estar na pagina', () => {
    const LoginButton = screen.getByTestId('LoginButton');
    expect(LoginButton).toBeInTheDocument();
  });

  it('Quando a pagina inicia o botao de Login deve estar desativado', () => {
    const LoginButton = screen.getByTestId('LoginButton');
    expect(LoginButton).toBeDisabled();
  });

  it('O input de usuario funciona corretamente', () => {
    const LoginButton = screen.getByTestId('LoginButton');
    const userInput = screen.getByTestId('userLoginInput');
    userEvent.type(userInput, 'teste@teste.com');
    expect(userInput.value).toBe('teste@teste.com');
    expect(LoginButton).toBeDisabled();
  });

  it('O input de password funciona corretamente', () => {
    const LoginButton = screen.getByTestId('LoginButton');
    const passwordInput = screen.getByTestId('passwordLoginInput');
    userEvent.type(passwordInput, 'senha_teste');
    expect(passwordInput.value).toBe('senha_teste');
    expect(LoginButton).toBeDisabled();
  });

  it('Se ambos Inputs estiverem preenchidos, o botao de login fica ativado', () => {
    const LoginButton = screen.getByTestId('LoginButton');
    const passwordInput = screen.getByTestId('passwordLoginInput');
    const userInput = screen.getByTestId('userLoginInput');
    userEvent.type(userInput, 'teste@teste.com');
    userEvent.type(passwordInput, 'senha_teste');
    expect(LoginButton).toBeEnabled();
  });
});
