import React, { useEffect, useState } from 'react';
import { Routes, Route } from './router';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import ExplorerPage from './pages/ExplorerPage';
import { fetchAllBreeds } from './services/dogApi';
import type { BreedsMap } from './services/dogApi';

export default function App() {
  const [breedsMap, setBreedsMap] = useState<BreedsMap>({});
  const [loadingBreeds, setLoadingBreeds] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadBreeds(): Promise<void> {
      try {
        setLoadingBreeds(true);
        const data = await fetchAllBreeds();
        if (isMounted) {
          setBreedsMap(data);
          setError(null);
        }
      } catch (err: unknown) {
        if (isMounted) {
          const errorMessage =
            err instanceof Error ? err.message : '׳³ֲ©׳³ג€™׳³ג„¢׳³ֲ׳³ג€ ׳³ג€˜׳³ֻ׳³ֲ¢׳³ג„¢׳³ֲ ׳³ֳ— ׳³ג€׳³ֲ ׳³ֳ—׳³ג€¢׳³ֲ ׳³ג„¢׳³ֲ';
          setError(errorMessage);
        }
      } finally {
        if (isMounted) {
          setLoadingBreeds(false);
        }
      }
    }
    loadBreeds();
    return () => {
      isMounted = false;
    };
  }, []);

  const totalBreeds: number = Object.keys(breedsMap).length;
  const totalSubBreeds: number = Object.values(breedsMap).reduce(
    (sum, subList) => sum + subList.length,
    0
  );

  return (
    <div className="app-wrapper">
      <Navbar totalBreeds={totalBreeds} />
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                totalBreeds={totalBreeds}
                totalSubBreeds={totalSubBreeds}
                loading={loadingBreeds}
              />
            }
          />
          <Route
            path="/explorer"
            element={
              <ExplorerPage
                breedsMap={breedsMap}
                loadingBreeds={loadingBreeds}
                error={error}
              />
            }
          />
        </Routes>
      </main>
      <footer className="app-footer">
        <p>נבנה באמצעות React + TypeScript + Vite | מבוסס על Dog CEO API 🐾</p>
      </footer>
    </div>
  );
}