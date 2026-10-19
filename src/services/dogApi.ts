const BASE_URL = 'https://dog.ceo/api';

export type BreedsMap = Record<string, string[]>;

export interface DogApiListResponse {
  message: BreedsMap;
  status: string;
}

export interface DogApiImagesResponse {
  message: string[] | string;
  status: string;
}

export type DogTabId = 'working' | 'companion' | 'hunting' | 'subbreeds' | 'all';

export interface DogTab {
  id: DogTabId;
  label: string;
  icon: string;
  description: string;
  breeds?: string[];
  filterFn?: (breed: string, subBreeds: string[]) => boolean;
}

export async function fetchAllBreeds(): Promise<BreedsMap> {
  const response = await fetch(`${BASE_URL}/breeds/list/all`);
  if (!response.ok) {
    throw new Error('שגיאה בטעינת רשימת גזעי הכלבים מהשרת');
  }
  const data: DogApiListResponse = await response.json();
  if (data.status !== 'success') {
    throw new Error('תגובת שרת לא תקינה');
  }
  return data.message;
}

export async function fetchBreedImages(
  breed: string,
  subBreed: string = '',
  count: number = 8
): Promise<string[]> {
  if (!breed) return [];
  const path = subBreed
    ? `${BASE_URL}/breed/${breed}/${subBreed}/images/random/${count}`
    : `${BASE_URL}/breed/${breed}/images/random/${count}`;

  const response = await fetch(path);
  if (!response.ok) {
    throw new Error('שגיאה בטעינת תמונות הגזע');
  }
  const data: DogApiImagesResponse = await response.json();
  return Array.isArray(data.message) ? data.message : [data.message];
}

export const DOG_TABS: DogTab[] = [
  {
    id: 'working',
    label: 'כלבי עבודה ושמירה',
    icon: '🛡️',
    description: 'גזעים חזקים, נאמנים ובעלי אינסטינקט הגנה ועבודה מפותח.',
    breeds: [
      'boxer', 'doberman', 'rottweiler', 'husky', 'malamute',
      'akita', 'germanshepherd', 'mastiff', 'bullterrier', 'stbernard',
      'newfoundland', 'samoyed', 'schnauzer', 'pinscher'
    ],
  },
  {
    id: 'companion',
    label: 'כלבי לוויה ובית',
    icon: '🏠',
    description: 'כלבים ידידותיים, קומפקטיים ומלאי שמחת חיים המתאימים במיוחד למשפחה ולדירה.',
    breeds: [
      'pug', 'chihuahua', 'pomeranian', 'maltese', 'shihtzu',
      'papillon', 'poodle', 'bulldog', 'frise', 'havanese',
      'pekinese', 'lhasa', 'cotondetulear', 'affenpinscher'
    ],
  },
  {
    id: 'hunting',
    label: 'כלבי ציד, ספורט ורועים',
    icon: '🏃',
    description: 'גזעים אנרגטיים, מהירים וחכמים במיוחד שאוהבים מרחבים ופעילות גופנית.',
    breeds: [
      'retriever', 'beagle', 'collie', 'corgi', 'australian',
      'spaniel', 'hound', 'pointer', 'setter', 'terrier',
      'dalmatian', 'greyhound', 'shiba', 'vizsla', 'weimaraner', 'whippet'
    ],
  },
  {
    id: 'subbreeds',
    label: 'משפחות עם תתי-גזעים',
    icon: '🧬',
    description: 'גזעי-על המכילים מספר וריאציות ותתי-גזעים שונים ב-API.',
    filterFn: (_breed: string, subBreeds: string[]) =>
      Boolean(subBreeds && subBreeds.length > 0),
  },
  {
    id: 'all',
    label: 'כל הגזעים (A-Z)',
    icon: '🌍',
    description: 'הרשימה המלאה של כל גזעי הכלבים הקיימים במאגר Dog CEO.',
    filterFn: () => true,
  },
];

export function getBreedsForTab(breedsMap: BreedsMap, tabId: DogTabId): string[] {
  const allBreedNames = Object.keys(breedsMap || {});
  const tab = DOG_TABS.find((t) => t.id === tabId) || DOG_TABS[0];

  if (tab.filterFn) {
    return allBreedNames.filter((breed) => tab.filterFn!(breed, breedsMap[breed]));
  }

  const allowedBreeds = tab.breeds || [];
  const matched = allBreedNames.filter((breed) => allowedBreeds.includes(breed));
  return matched.length > 0 ? matched : allBreedNames;
}