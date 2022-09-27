import React from 'react';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Test the page NotFound', () => {
  it('should show the content of the page', () => {
    renderWithRouter(<App />, { route: '/badroute' });

    const errorMsgEl = screen.getByText('Ops!');
    expect(errorMsgEl).toBeDefined();
  })
})