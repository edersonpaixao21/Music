import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import { describe, expect, it } from 'vitest';
import Login from '../pages/Login.jsx';
import { screen } from '@testing-library/react';

describe('Tests the whole login page', () => {
  it('should render the input', () => {
    renderWithRouter(<Login />);
    const inputEl = screen.getByPlaceholderText('Name');
    expect(inputEl).toBeInTheDocument();
  });

  it('should be redirected to "/search"', async () => {
    const { user } = renderWithRouter(<Login />);
    const buttonEl = screen.getByRole('button', { name: /Log in/ });
    const inputEl = screen.getByPlaceholderText(/Name/i);
    
    
    expect(inputEl).toBeInTheDocument();
    expect(buttonEl).toBeInTheDocument();
    expect(buttonEl).toBeDisabled();

    await user.type(inputEl, 'Username');
    expect(buttonEl).not.toBeDisabled();
    await user.click(buttonEl);
    const loadingMessage = await screen.findByText('Loading...');
    expect(loadingMessage).toBeInTheDocument();
  });
});
