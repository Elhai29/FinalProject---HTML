import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from '../router';
import App from '../App';

const mockBreedsResponse = {
  message: {
    boxer: [],
    husky: [],
    pug: [],
    retriever: ['golden', 'chesapeake'],
  },
  status: 'success',
};

const mockImagesResponse = {
  message: [
    'https://images.dog.ceo/breeds/boxer/img1.jpg',
    'https://images.dog.ceo/breeds/boxer/img2.jpg',
  ],
  status: 'success',
};

describe('App Routing & Tabs Integration Tests (TS)', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn((input: RequestInfo | URL) => {
      const url = typeof input === 'string' ? input : input.toString();
      if (url.includes('/breeds/list/all')) {
        return Promise.resolve({
          ok: true,
          json: async () => mockBreedsResponse,
        } as Response);
      }
      return Promise.resolve({
        ok: true,
        json: async () => mockImagesResponse,
      } as Response);
    });
  });

  it('׳³ֲ³ײ²ֲ׳³ֲ³ײ²ֲ¦׳³ֲ³׳’ג€ֲ¢׳³ֲ³׳’ג‚¬ג„¢ ׳³ֲ³ײ²ֲ׳³ֲ³ײ³ג€” ׳³ֲ³׳’ג‚¬ֲ׳³ֲ³ײ²ֲ£ ׳³ֲ³׳’ג‚¬ֲ׳³ֲ³ײ²ֲ ׳³ֲ³׳’ג‚¬ג€׳³ֲ³׳’ג€ֲ¢׳³ֲ³ײ³ג€”׳³ֲ³׳’ג‚¬ֲ ׳³ֲ³׳’ג‚¬ֲ¢׳³ֲ³ײ²ֲ׳³ֲ³ײ²ֲ׳³ֲ³׳’ג€ֳ—׳³ֲ³ײ²ֲ©׳³ֲ³ײ²ֲ¨ ׳³ֲ³ײ²ֲ׳³ֲ³ײ²ֲ¢׳³ֲ³׳’ג‚¬ֻ׳³ֲ³ײ²ֲ¨ ׳³ֲ³ײ²ֲ׳³ֲ³׳’ג‚¬ֲ׳³ֲ³ײ²ֲ£ ׳³ֲ³׳’ג‚¬ֲ׳³ֲ³ײ²ֲ¢׳³ֲ³׳’ג‚¬ֻ׳³ֲ³׳’ג‚¬ֲ¢׳³ֲ³׳’ג‚¬ֲ׳³ֲ³׳’ג‚¬ֲ ׳³ֲ³׳’ג‚¬ֻ׳³ֲ³ײ²ֲ׳³ֲ³׳’ג‚¬ג€׳³ֲ³׳’ג€ֲ¢׳³ֲ³ײ²ֲ¦׳³ֲ³׳’ג‚¬ֲ ׳³ֲ³ײ²ֲ¢׳³ֲ³ײ²ֲ ׳³ֲ³׳’ג‚¬ֲ׳³ֲ³׳’ג‚¬ֳ·׳³ֲ³׳’ג€ֳ—׳³ֲ³ײ³ג€”׳³ֲ³׳’ג‚¬ֲ¢׳³ֲ³ײ²ֲ¨ (Routing)', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/׳³ֲ³׳’ג‚¬ג„¢׳³ֲ³ײ²ֲ׳³ֲ³׳’ג‚¬ֲ¢ ׳³ֲ³ײ²ֲ׳³ֲ³ײ³ג€” ׳³ֲ³ײ²ֲ¢׳³ֲ³׳’ג‚¬ֲ¢׳³ֲ³ײ²ֲ׳³ֲ³ײ²ֲ ׳³ֲ³׳’ג‚¬ֲ׳³ֲ³׳’ג‚¬ֳ·׳³ֲ³ײ²ֲ׳³ֲ³׳’ג‚¬ֻ׳³ֲ³׳’ג€ֲ¢׳³ֲ³ײ²ֲ ׳³ֲ³ײ²ֲ¢׳³ֲ³ײ²ֲ/i)).toBeInTheDocument();

    const ctaBtn = screen.getByRole('button', {
      name: /׳³ֲ³׳’ג‚¬ֳ·׳³ֲ³ײ²ֲ ׳³ֲ³׳’ג€ֲ¢׳³ֲ³ײ²ֲ¡׳³ֲ³׳’ג‚¬ֲ ׳³ֲ³ײ²ֲ׳³ֲ³׳’ג‚¬ֲ׳³ֲ³ײ²ֲ£ ׳³ֲ³׳’ג‚¬ֲ׳³ֲ³ײ²ֲ¢׳³ֲ³׳’ג‚¬ֻ׳³ֲ³׳’ג‚¬ֲ¢׳³ֲ³׳’ג‚¬ֲ׳³ֲ³׳’ג‚¬ֲ ׳³ֲ³׳’ג‚¬ֲ¢׳³ֲ³ײ²ֲ׳³ֲ³ײ²ֲ§׳³ֲ³ײ»ֲ׳³ֲ³ײ²ֲ׳³ֲ³׳’ג‚¬ֲ¢׳³ֲ³׳’ג‚¬ג„¢ ׳³ֲ³׳’ג‚¬ֲ׳³ֲ³׳’ג‚¬ג„¢׳³ֲ³׳’ג‚¬ג€׳³ֲ³ײ²ֲ¢׳³ֲ³׳’ג€ֲ¢׳³ֲ³ײ²ֲ/i,
    });
    await user.click(ctaBtn);

    await waitFor(() => {
      expect(screen.getByRole('tablist', { name: /׳³ֲ³ײ²ֲ¡׳³ֲ³׳’ג‚¬ֲ¢׳³ֲ³׳’ג‚¬ג„¢׳³ֲ³׳’ג€ֲ¢ ׳³ֲ³׳’ג‚¬ֳ·׳³ֲ³ײ²ֲ׳³ֲ³׳’ג‚¬ֻ׳³ֲ³׳’ג€ֲ¢׳³ֲ³ײ²ֲ/i })).toBeInTheDocument();
    });
  });

  it('׳³ֲ³ײ²ֲ׳³ֲ³ײ²ֲ׳³ֲ³׳’ג€ֳ—׳³ֲ³ײ²ֲ©׳³ֲ³ײ²ֲ¨ ׳³ֲ³׳’ג‚¬ֲ׳³ֲ³׳’ג‚¬ג€׳³ֲ³ײ²ֲ׳³ֲ³׳’ג€ֳ—׳³ֲ³ײ³ג€” ׳³ֲ³ײ²ֲ׳³ֲ³ײ²ֲ©׳³ֲ³׳’ג‚¬ֲ¢׳³ֲ³ײ²ֲ ׳³ֲ³׳’ג€ֲ¢׳³ֲ³׳’ג‚¬ֲ¢׳³ֲ³ײ³ג€” ׳³ֲ³׳’ג‚¬ֲ¢׳³ֲ³ײ²ֲ׳³ֲ³ײ²ֲ¢׳³ֲ³׳’ג‚¬ֻ׳³ֲ³ײ²ֲ¨ ׳³ֲ³׳’ג‚¬ֻ׳³ֲ³׳’ג€ֲ¢׳³ֲ³ײ²ֲ ׳³ֲ³׳’ג‚¬ג„¢׳³ֲ³׳’ג‚¬ג€׳³ֲ³ײ²ֲ¢׳³ֲ³׳’ג€ֲ¢ ׳³ֲ³׳’ג‚¬ֳ·׳³ֲ³ײ²ֲ׳³ֲ³׳’ג‚¬ֻ׳³ֲ³׳’ג€ֲ¢׳³ֲ³ײ²ֲ ׳³ֲ³׳’ג‚¬ֻ׳³ֲ³ײ³ג€”׳³ֲ³׳’ג‚¬ֲ¢׳³ֲ³ײ²ֲ ׳³ֲ³׳’ג‚¬ֲ׳³ֲ³ײ²ֲ׳³ֲ³ײ²ֲ©׳³ֲ³׳’ג‚¬ֲ¢׳³ֲ³ײ²ֲ ׳³ֲ³׳’ג€ֲ¢׳³ֲ³ײ³ג€”', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/explorer']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('tab', { name: /׳³ֲ³׳’ג‚¬ֳ·׳³ֲ³ײ²ֲ׳³ֲ³׳’ג‚¬ֻ׳³ֲ³׳’ג€ֲ¢ ׳³ֲ³ײ²ֲ¢׳³ֲ³׳’ג‚¬ֻ׳³ֲ³׳’ג‚¬ֲ¢׳³ֲ³׳’ג‚¬ֲ׳³ֲ³׳’ג‚¬ֲ ׳³ֲ³׳’ג‚¬ֲ¢׳³ֲ³ײ²ֲ©׳³ֲ³ײ²ֲ׳³ֲ³׳’ג€ֲ¢׳³ֲ³ײ²ֲ¨׳³ֲ³׳’ג‚¬ֲ/i })).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /boxer/i })).toBeInTheDocument();
    const huskyBtn = screen.getByRole('button', { name: /husky/i });
    await user.click(huskyBtn);

    await waitFor(() => {
      expect(screen.getByText(/׳³ֲ ײ²ֲײ²ֲײ²ֲ¾ HUSKY/i)).toBeInTheDocument();
    });

    const subBreedsTab = screen.getByRole('tab', { name: /׳³ֲ³ײ²ֲ׳³ֲ³ײ²ֲ©׳³ֲ³׳’ג€ֳ—׳³ֲ³׳’ג‚¬ג€׳³ֲ³׳’ג‚¬ֲ¢׳³ֲ³ײ³ג€” ׳³ֲ³ײ²ֲ¢׳³ֲ³ײ²ֲ ׳³ֲ³ײ³ג€”׳³ֲ³ײ³ג€”׳³ֲ³׳’ג€ֲ¢-׳³ֲ³׳’ג‚¬ג„¢׳³ֲ³׳’ג‚¬ג€׳³ֲ³ײ²ֲ¢׳³ֲ³׳’ג€ֲ¢׳³ֲ³ײ²ֲ/i });
    await user.click(subBreedsTab);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /golden/i })).toBeInTheDocument();
    });
  });
});