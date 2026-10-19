import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
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
    vi.restoreAllMocks();
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

  it('מציג את דף הנחיתה ומאפשר מעבר לדף העבודה בלחיצה על הכפתור', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/גלו את עולם הכלבים עם/i)).toBeInTheDocument();

    const ctaBtn = screen.getByRole('button', {
      name: /כניסה לדף העבודה ולקטלוג הגזעים/i,
    });
    fireEvent.click(ctaBtn);

    await waitFor(() => {
      expect(screen.getByRole('tablist', { name: /סוגי כלבים/i })).toBeInTheDocument();
    });
  });

  it('מאפשר החלפת לשוניות ומעבר בין גזעי כלבים', async () => {
    render(
      <MemoryRouter initialEntries={['/explorer']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('tab', { name: /כלבי עבודה ושמירה/i })).toBeInTheDocument();
    });

    const huskyBtn = await screen.findByRole('button', { name: /husky/i });
    fireEvent.click(huskyBtn);

    // בדיקת כותרת הגזע הנבחר בלבד כדי למנוע כפילויות
    await waitFor(() => {
      const breedTitle = document.querySelector('.selected-breed-title');
      expect(breedTitle?.textContent).toMatch(/HUSKY/i);
    });
  });
});