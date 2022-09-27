import React from 'react';
import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import data from './helpers/dataMock';

describe('Test the page album', () => {  
  const ID = '349769419';

  
  it('should render the selected album', async () => {
    
    global.fetch = vi.fn(() => Promise.resolve({
      json: () => Promise.resolve({
        results: [data],
      }),
    }));

    renderWithRouter(<App />, { route: `/album/${ID}` });

    const loadingMessage = await screen.findByText('Loading...');
    expect(loadingMessage).toBeInTheDocument();

    const albumNameEl = screen.getByRole('heading', { name: 'Chico Buarque de Hollanda' });
    expect(albumNameEl).toBeDefined();
  });
})