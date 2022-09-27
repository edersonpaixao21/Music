import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import { describe, expect, it } from 'vitest';
import App from '../App';
import { screen } from '@testing-library/react';

const mock = {
  artistName: 'Chico Buarque',
  collectionName: 'Sonho de um Carnaval',
  artworkUrl100: 'https://is4-ssl.mzstatic.com/image/thumb/Music118/v4/34/0e/c6/340ec6a6-58c5-655a-a9f6-0b872f3e1b91/00042283601826.rgb.jpg/100x100bb.jpg',
}

describe('Tests the login page', () => {
  it('should render the button "Search"', () => {
    renderWithRouter(<App />, { route: '/search' });

    const buttonEl = screen.getByRole('button', { name: /Search/i });
    expect(buttonEl).toBeInTheDocument();
  });
  
  it('should render the search input', async () => {
    const { user } = renderWithRouter(<App />, { route: '/search' });
    
    const inputEl = screen.getByPlaceholderText(/What's/i);
    expect(inputEl).toBeInTheDocument();

    await user.type(inputEl, 'Chico Buarque');
    const buttonEl = screen.getByRole('button', { name: /Search/i });
    expect(buttonEl).not.toBeDisabled();

    const artistNameEl = screen.getByText('Chico Buarque');
    expect(artistNameEl).toBeInTheDocument();

    // await user.click(buttonEl);


    // const loadingMessage = await screen.findByText('Loading...');
    // expect(loadingMessage).toBeInTheDocument();
    
    // const artistImgEl = await screen.findAllByRole('img');
    // console.log(artistImgEl);

  });

  

  // it('should be redirected to "/search"', async () => {
  //   const { user } = renderWithRouter(<Login />);
  //   const buttonEl = screen.getByRole('button', { name: /Log in/ });
  //   const inputEl = screen.getByPlaceholderText(/Name/i);
    
    
  //   expect(inputEl).toBeInTheDocument();
  //   expect(buttonEl).toBeInTheDocument();
  //   expect(buttonEl).toBeDisabled();

  //   
  //   expect(buttonEl).not.toBeDisabled();
  //   
  //   
  // });
});