import React from 'react';
import { useNavigate } from '../router';

export interface LandingPageProps {
  totalBreeds: number;
  totalSubBreeds: number;
  loading: boolean;
}

export default function LandingPage({
  totalBreeds,
  totalSubBreeds,
  loading,
}: LandingPageProps) {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-pill">✨ פרויקט TypeScript מבוסס Dog CEO API</span>
          <h1 className="hero-title">
            גלו את עולם הכלבים עם{' '}
            <span className="gradient-text">DogCEO Explorer</span>
          </h1>
          <p className="hero-description">
            מערכת אינטראקטיבית מתקדמת לחקר גזעי כלבים מרחבי העולם. סננו לפי לשוניות
            של סוגי כלבים, דפדפו בין גזעים ותתי-גזעים, וצפו בגלריות תמונות חיות בזמן אמת.
          </p>

          <div className="hero-actions">
            <button
              className="btn-primary btn-large"
              onClick={() => navigate('/explorer')}
            >
              כניסה לדף העבודה ולקטלוג הגזעים ←
            </button>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-number">
                {loading ? '...' : totalBreeds || 108}
              </span>
              <span className="stat-label">גזעים ראשיים ב-API</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">
                {loading ? '...' : totalSubBreeds || 99}
              </span>
              <span className="stat-label">תתי-גזעים ייחודיים</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">5</span>
              <span className="stat-label">לשוניות קטגוריה חכמות</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="floating-showcase">
            <div className="showcase-main-card">
              <div className="showcase-emoji">🐕‍🦺</div>
              <h3>ממשק לשוניות חכם</h3>
              <p>מעבר מהיר בין כלבי עבודה, לוויה, ציד ומשפחות גזעים בלחיצת כפתור</p>
            </div>
            <div className="showcase-badge badge-top">⚡ Vite + React + TS</div>
            <div className="showcase-badge badge-bottom">🧪 כולל מערך בדיקות מלא</div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">מה מחכה לכם בדף העבודה?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🗂️</div>
            <h3>לשוניות סוגי כלבים</h3>
            <p>
              חלוקה נוחה לקטגוריות: כלבי שמירה ועבודה, כלבי בית ולוויה, כלבי ציד
              ורועים, ומשפחות עם תתי-גזעים.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>מעבר מהיר בין גזעים</h3>
            <p>
              בכל לשונית תמצאו סרגל גזעים ייעודי המאפשר לדלג בין הגזעים השונים ולסנן
              לפי תת-גזע ספציפי.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📸</div>
            <h3>גלריה חיה בתצוגה מלאה</h3>
            <p>
              טעינת תמונות אקראיות ישירות מהשרת, אפשרות רענון תמונות ותצוגת תקריב
              במודאל ייעודי.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}