import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import { describe, expect, it, vi } from 'vitest';
import App from '../App';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import data from './helpers/dataMock';

describe('Tests the page "/favorites"', () => {
  it('should render favorited songs', async () => {

    // global.fetch = vi.fn(() => Promise.resolve({
    //   json: () => Promise.resolve({ data }),
    // }));

    renderWithRouter(<App />, { route: '/favorites' });

    const loadingMessage = await screen.findAllByText('Loading...');
    expect(loadingMessage[0]).toBeInTheDocument();

    await waitForElementToBeRemoved(loadingMessage[0], { timeout: 3000 });

    const songNameEl = screen.getByRole('img');
    expect(songNameEl).toBeInTheDocument();
  });
  it('should remove the song from the page', async () => {
    renderWithRouter(<App />, { route: '/favorites' });

    const loadingMessage = await screen.findAllByText('Loading...');
    expect(loadingMessage[0]).toBeInTheDocument();

    await waitForElementToBeRemoved(loadingMessage[0], { timeout: 3000 });

    const songNameEl = screen.getByRole('img');
    // const heartInput = screen.getByRole('checkbox');
    // console.log(heartInput);
    expect(songNameEl).toBeInTheDocument();
    // expect(heartInput).toBeInTheDocument();
  })
})