import { useState } from 'react';
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

export function AreasTab() {
  const { t } = useTranslation();
  const { areas, loading, error } = useAreas();
  const [activeVibes, setActiveVibes] = useState<Vibe[]>([]);

  const toggleVibe = (vibe: Vibe) => {
    setActiveVibes(prev =>
      prev.includes(vibe) ? prev.filter(v => v !== vibe) : [...prev, vibe]
    );
  };

  const displayAreas = error || areas.length === 0 ? FALLBACK_AREAS : areas;

  const sorted =
    activeVibes.length === 0
      ? displayAreas
      : [...displayAreas].sort(
          (a, b) =>
            activeVibes.reduce((sum, v) => sum + (b[v] ?? 0), 0) -
            activeVibes.reduce((sum, v) => sum + (a[v] ?? 0), 0)
        );

  return (
    <div>
      <p className="text-gray-500 text-sm mb-6">{t('areas.subtitle')}</p>

      <div className="flex gap-2 flex-wrap mb-8">
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
