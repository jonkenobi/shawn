import { useTranslation } from 'react-i18next';
import type { Area } from '../types';

interface Props {
  area: Area;
}

const ATTRS = [
  { key: 'coffee',   emoji: '☕', bg: 'bg-amber-100',  text: 'text-amber-800'  },
  { key: 'drinks',   emoji: '🍻', bg: 'bg-rose-100',   text: 'text-rose-800'   },
  { key: 'nature',   emoji: '🌿', bg: 'bg-green-100',  text: 'text-green-800'  },
  { key: 'shopping', emoji: '🛍️', bg: 'bg-indigo-100', text: 'text-indigo-800' },
] as const;

export function AreaCard({ area }: Props) {
  const { t } = useTranslation();
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${area.latitude},${area.longitude}`;

  const tags = ATTRS
    .map(a => ({ ...a, score: area[a.key] as number }))
    .filter(a => a.score >= 3)
    .sort((a, b) => b.score - a.score);

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all group"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4 group-hover:text-rose-600 transition-colors">
        {area.area_name}
      </h3>
      {tags.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span
              key={tag.key}
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${tag.bg} ${tag.text}`}
            >
              {tag.emoji} {t(`areas.vibes.${tag.key}`)}
              {tag.score === 5 && <span className="text-xs opacity-60 ml-0.5">✦</span>}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400 italic">{t('areas.noStandoutVibes')}</p>
      )}
    </a>
  );
}
