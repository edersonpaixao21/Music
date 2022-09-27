import React from 'react';
import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import renderWithRouter from './helpers/renderWithRouter';
import * as userAPI from '../services/userAPI';
import App from '../App';

const USERIMAGE = `https://vignette.wikia.nocookie.net/joke-battles/images/4/40/18360-doge-doge-simple.jpg/revision/latest?cb=20151209161638`;

const userInfo = {
  name: 'Doge Dog',
  email: 'doge.dog@email.com',
  image: USERIMAGE,
  description: 'Best meme',
};

describe('Tests the profile page', () => {
  it('should render the inputs', () => {
    renderWithRouter(<App />, { route: '/profile/edit' });

    const inputImgEl = screen.getByPlaceholderText('Set the exact link of your photo');
    const inputNameEl = screen.getByPlaceholderText('Name');
    const inputEmalEl = screen.getByPlaceholderText('username@email.com');
    const inputDescriptionEl = screen.getByPlaceholderText('About me');

    expect(inputImgEl).toBeDefined();
    expect(inputNameEl).toBeDefined();
    expect(inputEmalEl).toBeDefined();
    expect(inputDescriptionEl).toBeDefined();

  });

  it('tests if the button "Save" is enabled after completing the inputs', async () => {
    const { user } = renderWithRouter(<App />, { route: '/profile/edit' });

    const inputImgEl = screen.getByPlaceholderText('Set the exact link of your photo');
    const inputNameEl = screen.getByPlaceholderText('Name');
    const inputEmalEl = screen.getByPlaceholderText('username@email.com');
    const inputDescriptionEl = screen.getByPlaceholderText('About me');
    const buttonEl = screen.getByRole('button', { name: /Save/i });

    expect(buttonEl).toHaveProperty('disabled');
    expect(buttonEl).toBeDisabled(true);

    user.type(inputImgEl, USERIMAGE);
    user.type(inputNameEl, 'Doge Dog');
    user.type(inputEmalEl, 'doge.dog@email.com');
    user.type(inputDescriptionEl, 'Best meme');

    expect(buttonEl).toBeDisabled(false);
    
    await user.click(buttonEl);
    const spy = vi.spyOn(userAPI, 'updateUser');
    userAPI.updateUser(userInfo);

    expect(spy).toHaveBeenCalled();
    
  });  
});