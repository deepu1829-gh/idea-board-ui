import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import IdeaBoard from './page';

// Mock fetch and WebSocket
const mockFetch = jest.fn();
global.fetch = mockFetch;

class MockWebSocket {
  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;
  onmessage: ((event: { data: string }) => void) | null = null;
  onerror: (() => void) | null = null;
  onclose: (() => void) | null = null;
  constructor(url: string, protocols?: string | string[]) {}
  close() {}
  addEventListener() {}
  removeEventListener() {}
  send() {}
}
// @ts-expect-error: MockWebSocket does not fully implement WebSocket interface, but is sufficient for tests
global.WebSocket = MockWebSocket;

describe('IdeaBoard Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the main heading', () => {
    render(<IdeaBoard />);
    expect(screen.getByText('The Idea Board')).toBeInTheDocument();
  });

  it('shows loading state initially', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => [] });
    render(<IdeaBoard />);
    expect(screen.getByText(/Loading ideas/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText(/No ideas yet/i)).toBeInTheDocument());
  });

  it('submits a new idea', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => [] }); // initial fetch
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({ id: 1, text: 'Test idea', upvotes: 0 }) }); // submit
    render(<IdeaBoard />);
    const textarea = screen.getByPlaceholderText(/Share your idea/i);
    fireEvent.change(textarea, { target: { value: 'Test idea' } });
    fireEvent.click(screen.getByText(/Submit Idea/i));
    await waitFor(() => expect(screen.getByText('Test idea')).toBeInTheDocument());
  });

  it('shows error on failed idea submission', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => [] }); // initial fetch
    mockFetch.mockResolvedValueOnce({ ok: false }); // submit fails
    render(<IdeaBoard />);
    const textarea = screen.getByPlaceholderText(/Share your idea/i);
    fireEvent.change(textarea, { target: { value: 'Fail idea' } });
    fireEvent.click(screen.getByText(/Submit Idea/i));
    await waitFor(() => expect(screen.getByText(/Could not submit idea/i)).toBeInTheDocument());
  });

  it('shows error on failed ideas fetch', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false }); // initial fetch fails
    render(<IdeaBoard />);
    await waitFor(() => expect(screen.getByText(/Could not load ideas/i)).toBeInTheDocument());
  });

  it('shows error on failed upvote', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => [{ id: 1, text: 'Idea', upvotes: 0 }] }); // initial fetch
    mockFetch.mockResolvedValueOnce({ ok: false }); // upvote fails
    render(<IdeaBoard />);
    await waitFor(() => expect(screen.getByText('Idea')).toBeInTheDocument());
    fireEvent.click(screen.getByText(/Upvote/i));
    await waitFor(() => expect(screen.getByText(/Could not upvote idea/i)).toBeInTheDocument());
  });

  it('upvotes an idea', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => [{ id: 1, text: 'Idea', upvotes: 0 }] }); // initial fetch
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({ id: 1, text: 'Idea', upvotes: 1 }) }); // upvote
    render(<IdeaBoard />);
    await waitFor(() => expect(screen.getByText('Idea')).toBeInTheDocument());
    fireEvent.click(screen.getByText(/Upvote/i));
    await waitFor(() => expect(screen.getByText('1')).toBeInTheDocument());
  });

  it('does not submit empty idea', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => [] }); // initial fetch
    render(<IdeaBoard />);
    fireEvent.click(screen.getByText(/Submit Idea/i));
    expect(mockFetch).toHaveBeenCalledTimes(1); // Only initial fetch
  });
});
