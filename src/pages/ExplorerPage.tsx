import React, { useState, useEffect, useMemo } from 'react';
import {
  DOG_TABS,
  getBreedsForTab,
  fetchBreedImages,
} from '../services/dogApi';
import type { BreedsMap, DogTabId } from '../services/dogApi';
import ImageModal from '../components/ImageModal';

export interface ExplorerPageProps {
  breedsMap: BreedsMap;
  loadingBreeds: boolean;
  error: string | null;
}

export default function ExplorerPage({
  breedsMap,
  loadingBreeds,
  error,
}: ExplorerPageProps) {
  const [activeTab, setActiveTab] = useState<DogTabId>(DOG_TABS[0].id);
  const [selectedBreed, setSelectedBreed] = useState<string>('');
  const [selectedSubBreed, setSelectedSubBreed] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const [loadingImages, setLoadingImages] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const tabBreeds = useMemo<string[]>(() => {
    const breedsInTab = getBreedsForTab(breedsMap, activeTab);
    if (!searchQuery.trim()) return breedsInTab;
    return breedsInTab.filter((b) =>
      b.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );
  }, [breedsMap, activeTab, searchQuery]);

  useEffect(() => {
    const breedsInCurrentTab = getBreedsForTab(breedsMap, activeTab);
    if (breedsInCurrentTab.length > 0) {
      setSelectedBreed(breedsInCurrentTab[0]);
      setSelectedSubBreed('');
    } else {
      setSelectedBreed('');
      setSelectedSubBreed('');
    }
  }, [activeTab, breedsMap]);

  const loadImagesForSelection = async (breed: string, subBreed: string): Promise<void> => {
    if (!breed) return;
    try {
      setLoadingImages(true);
      const imgs = await fetchBreedImages(breed, subBreed, 8);
      setImages(imgs);
    } catch {
      setImages([]);
    } finally {
      setLoadingImages(false);
    }
  };

  useEffect(() => {
    if (selectedBreed) {
      loadImagesForSelection(selectedBreed, selectedSubBreed);
    }
  }, [selectedBreed, selectedSubBreed]);

  const currentTabInfo = DOG_TABS.find((t) => t.id === activeTab) || DOG_TABS[0];
  const subBreeds: string[] = selectedBreed ? breedsMap[selectedBreed] || [] : [];

  const currentBreedIndex = tabBreeds.indexOf(selectedBreed);
  const handlePrevBreed = (): void => {
    if (currentBreedIndex > 0) {
      setSelectedBreed(tabBreeds[currentBreedIndex - 1]);
      setSelectedSubBreed('');
    }
  };
  const handleNextBreed = (): void => {
    if (currentBreedIndex >= 0 && currentBreedIndex < tabBreeds.length - 1) {
      setSelectedBreed(tabBreeds[currentBreedIndex + 1]);
      setSelectedSubBreed('');
    }
  };

  if (loadingBreeds) {
    return (
      <div className="status-box" role="status">
        <p>טוען את מאגר גזעי הכלבים מה-API...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-box error-box" role="alert">
        <h2>⚠️ שגיאה בטעינת הנתונים</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="explorer-page">
      <div className="explorer-header">
        <div>
          <h1>קטלוג גזעי הכלבים</h1>
          <p>בחרו לשונית של סוג כלבים ודפדפו בין הגזעים ותתי-הגזעים השונים</p>
        </div>
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="חיפוש גזע בלשונית (באנגלית, למשל: pug)..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
            className="search-input"
            aria-label="חיפוש גזע"
          />
        </div>
      </div>

      <div className="tabs-bar" role="tablist" aria-label="סוגי כלבים">
        {DOG_TABS.map((tab) => {
          const count = getBreedsForTab(breedsMap, tab.id).length;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              className={`tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab.id);
                setSearchQuery('');
              }}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
              <span className="tab-count">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="tab-banner">
        <p>{currentTabInfo.description}</p>
      </div>

      <section className="breeds-selector-section" aria-label="בחירת גזע בלשונית">
        <div className="selector-header">
          <h2>גזעים בלשונית &quot;{currentTabInfo.label}&quot;:</h2>
          <div className="breed-Quick-nav">
            <button
              className="btn-nav-step"
              onClick={handlePrevBreed}
              disabled={currentBreedIndex <= 0}
            >
              → הגזע הקודם
            </button>
            <span className="step-indicator">
              {tabBreeds.length > 0
                ? `${currentBreedIndex + 1} מתוך ${tabBreeds.length}`
                : '0 גזעים'}
            </span>
            <button
              className="btn-nav-step"
              onClick={handleNextBreed}
              disabled={
                currentBreedIndex === -1 || currentBreedIndex >= tabBreeds.length - 1
              }
            >
              הגזע הבא ←
            </button>
          </div>
        </div>

        {tabBreeds.length === 0 ? (
          <p className="empty-msg">לא נמצאו גזעים התואמים לחיפוש שלך בלשונית זו.</p>
        ) : (
          <div className="breed-pills-container">
            {tabBreeds.map((breed) => {
              const subCount = (breedsMap[breed] || []).length;
              return (
                <button
                  key={breed}
                  className={`breed-pill ${selectedBreed === breed ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedBreed(breed);
                    setSelectedSubBreed('');
                  }}
                >
                  <span className="breed-name">{breed}</span>
                  {subCount > 0 && (
                    <span className="sub-badge" title={`${subCount} תתי-גזעים`}>
                      +{subCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </section>

      {subBreeds.length > 0 && (
        <section className="subbreeds-section" aria-label="תתי גזעים">
          <h3>תתי-גזעים של {selectedBreed.toUpperCase()}:</h3>
          <div className="subbreed-pills">
            <button
              className={`sub-pill ${selectedSubBreed === '' ? 'active' : ''}`}
              onClick={() => setSelectedSubBreed('')}
            >
              כל הווריאציות ({subBreeds.length})
            </button>
            {subBreeds.map((sub) => (
              <button
                key={sub}
                className={`sub-pill ${selectedSubBreed === sub ? 'active' : ''}`}
                onClick={() => setSelectedSubBreed(sub)}
              >
                {sub}
              </button>
            ))}
          </div>
        </section>
      )}

      {selectedBreed && (
        <section className="gallery-section">
          <div className="gallery-toolbar">
            <div>
              <h2 className="selected-breed-title">
                🐾 {selectedBreed.toUpperCase()}{' '}
                {selectedSubBreed && <span>/ {selectedSubBreed.toUpperCase()}</span>}
              </h2>
            </div>
            <button
              className="btn-secondary"
              onClick={() => loadImagesForSelection(selectedBreed, selectedSubBreed)}
              disabled={loadingImages}
            >
              🔄 טען תמונות חדשות
            </button>
          </div>

          {loadingImages ? (
            <div className="status-box">
              <p>שולף תמונות של {selectedBreed}...</p>
            </div>
          ) : (
            <div className="images-grid">
              {images.map((imgUrl, idx) => (
                <div
                  key={`${imgUrl}-${idx}`}
                  className="image-card"
                  onClick={() => setModalImage(imgUrl)}
                >
                  <img
                    src={imgUrl}
                    alt={`${selectedBreed} ${selectedSubBreed}`}
                    loading="lazy"
                  />
                  <div className="image-card-overlay">
                    <span>🔍 הגדל תמונה</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      <ImageModal
        imageUrl={modalImage}
        breedName={`${selectedBreed} ${selectedSubBreed}`.trim()}
        onClose={() => setModalImage(null)}
      />
    </div>
  );
}