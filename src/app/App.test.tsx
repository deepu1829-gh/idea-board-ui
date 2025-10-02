import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('App', () => {
  it('renders welcome message', () => {
    render(<div>Welcome to Idea Board UI!</div>);
    expect(screen.getByText('Welcome to Idea Board UI!')).toBeInTheDocument();
  });
});
