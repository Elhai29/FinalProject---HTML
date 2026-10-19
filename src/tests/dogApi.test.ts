import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  fetchAllBreeds,
  fetchBreedImages,
  getBreedsForTab,
  BreedsMap,
} from '../services/dogApi';

describe('dogApi TypeScript Service Tests', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('fetchAllBreeds ׳³ֲ©׳³ג€¢׳³ֲ׳³ֲ£ ׳³ג€˜׳³ג€׳³ֲ¦׳³ֲ׳³ג€”׳³ג€ ׳³ֲ׳³ֳ— ׳³ֲ¨׳³ֲ©׳³ג„¢׳³ֲ׳³ֳ— ׳³ג€׳³ג€™׳³ג€“׳³ֲ¢׳³ג„¢׳³ֲ ׳³ֲ׳³ג€-API', async () => {
    const mockData: { message: BreedsMap; status: string } = {
      message: {
        boxer: [],
        bulldog: ['boston', 'english', 'french'],
      },
      status: 'success',
    };

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    const result = await fetchAllBreeds();
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'https://dog.ceo/api/breeds/list/all'
    );
    expect(result).toEqual(mockData.message);
  });

  it('fetchBreedImages ׳³ג€˜׳³ג€¢׳³ֲ ׳³ג€ ׳³ג€÷׳³ֳ—׳³ג€¢׳³ג€˜׳³ֳ— URL ׳³ֳ—׳³ֲ§׳³ג„¢׳³ֲ ׳³ג€ ׳³ֲ׳³ג€™׳³ג€“׳³ֲ¢ ׳³ג€¢׳³ֲ׳³ֳ—׳³ֳ—-׳³ג€™׳³ג€“׳³ֲ¢', async () => {
    const mockImages = {
      message: ['https://images.dog.ceo/breeds/bulldog-french/1.jpg'],
      status: 'success',
    };

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockImages,
    } as Response);

    const images = await fetchBreedImages('bulldog', 'french', 4);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'https://dog.ceo/api/breed/bulldog/french/images/random/4'
    );
    expect(images).toHaveLength(1);
  });

  it('getBreedsForTab ׳³ֲ׳³ֲ¡׳³ֲ ׳³ֲ ׳³ג€™׳³ג€“׳³ֲ¢׳³ג„¢׳³ֲ ׳³ֲ׳³ג‚×׳³ג„¢ ׳³ֲ׳³ֲ©׳³ג€¢׳³ֲ ׳³ג„¢׳³ֳ—', () => {
    const sampleMap: BreedsMap = {
      boxer: [],
      pug: [],
      bulldog: ['english', 'french'],
    };

    const workingBreeds = getBreedsForTab(sampleMap, 'working');
    expect(workingBreeds).toContain('boxer');
    expect(workingBreeds).not.toContain('pug');

    const subBreedFamilies = getBreedsForTab(sampleMap, 'subbreeds');
    expect(subBreedFamilies).toEqual(['bulldog']);
  });
});