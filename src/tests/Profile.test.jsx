import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Tests the profile page', () => {
  it('should render the default icon', async () => {
    renderWithRouter(<App />, { route: '/profile' });

    await waitForElementToBeRemoved(() => screen.queryAllByText('Loading...'), { timeout: 3000 });    
   
    const defaultIconEl = screen.getByAltText(/undefined/i);
    expect(defaultIconEl).toBeInTheDocument();    
  });

  it('should render the profile button and get to "/profile/edit on click"', async () => {
    const { user } = renderWithRouter(<App />, { route: '/profile'});
    
    await waitForElementToBeRemoved(() => screen.queryAllByText('Loading...'), { timeout: 3000 });

    const editButtonEl = screen.getByRole('button', { name: /profile/i });
    expect(editButtonEl).toBeInTheDocument();

    await user.click(editButtonEl);
    const loadingTextEl = screen.queryAllByText('Loading...');
    expect(loadingTextEl[0]).toBeInTheDocument();
  });

  it('should get to the login page once "Logout" is clicked', async () => {
    const { user } = renderWithRouter(<App />, { route: '/profile'});

    await waitForElementToBeRemoved(() => screen.queryAllByText('Loading...'), { timeout: 3000 });

    const logoutBtnEl = screen.getByRole('button', { name: /logout/i });
    expect(logoutBtnEl).toBeInTheDocument();

    await user.click(logoutBtnEl);
    const inputEl = screen.getByPlaceholderText('Name');
    expect(inputEl).toBeDefined();
  })
});