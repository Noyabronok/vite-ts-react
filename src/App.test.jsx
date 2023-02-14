import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('something truthy and falsy', () => {
  it('true to be true', () => {
    expect(true).toBe(true);
  });

  it('false to be false', () => {
    expect(false).toBe(false);
  });
});


describe('App', () => {
  it('renders headline', async () => {
    render(<App />);

    // reminder to use this for looking up what's rendered
    // screen.debug();

    // check if App components renders headline
    const header = await screen.findByText('Vite + React');
    expect(header).toBeVisible();
  });
});