import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAreas } from '../hooks/useAreas';
import { AreaCard } from './AreaCard';

type Vibe = 'coffee' | 'drinks' | 'nature' | 'shopping';

const VIBES: { key: Vibe; emoji: string }[] = [
  { key: 'coffee', emoji: '☕' },
  { key: 'drinks', emoji: '🍻' },
  { key: 'nature', emoji: '🌿' },
  { key: 'shopping', emoji: '🛍️' },
];

const FALLBACK_AREAS = [
  { area_name: '渋谷 Shibuya', latitude: 35.658, longitude: 139.7016, coffee: 4, drinks: 5, nature: 2, shopping: 5 },
  { area_name: '新宿 Shinjuku', latitude: 35.6938, longitude: 139.7034, coffee: 3, drinks: 5, nature: 1, shopping: 5 },
  { area_name: '表参道 Omotesando', latitude: 35.6654, longitude: 139.7128, coffee: 5, drinks: 3, nature: 3, shopping: 5 },
  { area_name: '中目黒 Nakameguro', latitude: 35.6442, longitude: 139.6985, coffee: 5, drinks: 4, nature: 4, shopping: 3 },
  { area_name: '浅草 Asakusa', latitude: 35.7148, longitude: 139.7966, coffee: 3, drinks: 2, nature: 3, shopping: 4 },
  { area_name: '恵比寿 Ebisu', latitude: 35.6468, longitude: 139.7098, coffee: 4, drinks: 4, nature: 3, shopping: 3 },
];

export function AreasTab({ stickyTop = 0 }: { stickyTop?: number }) {
  const { t } = useTranslation();
  const { areas, loading, error } = useAreas();
  const [activeVibes, setActiveVibes] = useState<Vibe[]>([]);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleVibe = (vibe: Vibe) => {
    setActiveVibes(prev =>
      prev.includes(vibe) ? prev.filter(v => v !== vibe) : [...prev, vibe]
    );
  };

  const displayAreas = error || areas.length === 0 ? FALLBACK_AREAS : areas;

  const matchCount = (area: typeof displayAreas[0]) =>
    activeVibes.filter(v => (area[v] ?? 0) >= 3).length;

  const sorted =
    activeVibes.length === 0
      ? displayAreas
      : [...displayAreas].sort((a, b) => matchCount(b) - matchCount(a));

  return (
    <div>
      <p className="text-gray-500 text-sm mb-4">{t('areas.subtitle')}</p>

      <div
        className="flex gap-2 flex-wrap sticky z-9 bg-[#f8f7f4] py-3 -mx-4 px-4 sm:-mx-6 sm:px-6 mb-5"
        style={{ top: stickyTop }}
      >
        <button
          onClick={() => setActiveVibes([])}
          className={`cursor-pointer-desktop px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeVibes.length === 0
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
          }`}
        >
          🗺️ {t('areas.vibes.all')}
        </button>
        {VIBES.map(v => (
          <button
            key={v.key}
            onClick={() => toggleVibe(v.key)}
            className={`cursor-pointer-desktop px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeVibes.includes(v.key)
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
            }`}
          >
            {v.emoji} {t(`areas.vibes.${v.key}`)}
          </button>
        ))}
      </div>

      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-20 w-11 h-11 rounded-full bg-gray-900 text-white shadow-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6"/>
          </svg>
        </button>
      )}

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 h-36 animate-pulse border border-gray-100" />
          ))}
        </div>
      )}

      {!loading && (
        <>
          {(error || areas.length === 0) && (
            <p className="text-xs text-amber-600 mb-4 bg-amber-50 px-3 py-2 rounded-lg inline-block">
              {t('areas.fallbackNotice')}
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sorted.map(area => (
              <AreaCard key={area.area_name} area={area} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
