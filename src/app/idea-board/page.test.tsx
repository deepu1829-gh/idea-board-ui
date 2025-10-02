import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import IdeaBoard from './page';

// Mock fetch and WebSocket
beforeAll(() => {
  global.fetch = jest.fn();
  // @ts-expect-error: WebSocket mock for tests
  global.WebSocket = Object.assign(
    jest.fn(() => ({
      onmessage: null,
      onerror: null,
      onclose: null,
      close: jest.fn(),
      send: jest.fn(),
      readyState: 1,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })),
    {
      CONNECTING: 0,
      OPEN: 1,
      CLOSING: 2,
      CLOSED: 3,
    }
  );
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('IdeaBoard UI', () => {
  test('renders input and submit button', () => {
    render(<IdeaBoard />);
    expect(screen.getByPlaceholderText(/share your idea/i)).toBeInTheDocument();
    expect(screen.getByText(/submit idea/i)).toBeInTheDocument();
  });

  test('shows loading and error states', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() => Promise.reject());
    render(<IdeaBoard />);
    await waitFor(() => {
      expect(screen.getByText(/could not load ideas/i)).toBeInTheDocument();
    });
  });

  test('submits a new idea', async () => {
    (global.fetch as jest.Mock)
      .mockImplementationOnce(() => Promise.resolve({ ok: true, json: async () => [] })) // initial fetch
      .mockImplementationOnce(() => Promise.resolve({ ok: true, json: async () => ({ id: 1, text: 'Test', upvotes: 0 }) })); // submit
    render(<IdeaBoard />);
    fireEvent.change(screen.getByPlaceholderText(/share your idea/i), { target: { value: 'Test' } });
    fireEvent.click(screen.getByText(/submit idea/i));
    await waitFor(() => {
      expect(screen.getByDisplayValue('')).toBeInTheDocument();
    });
  });

  test('upvotes an idea', async () => {
    (global.fetch as jest.Mock)
      .mockImplementationOnce(() => Promise.resolve({ ok: true, json: async () => [{ id: 1, text: 'Test', upvotes: 0 }] })) // initial fetch
      .mockImplementationOnce(() => Promise.resolve({ ok: true, json: async () => ({ id: 1, text: 'Test', upvotes: 1 }) })); // upvote
    render(<IdeaBoard />);
    await waitFor(() => {
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText(/upvote/i));
    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument();
    });
  });
});
