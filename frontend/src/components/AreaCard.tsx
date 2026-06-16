import type { Area } from '../types';
import { ScoreBar } from './ScoreBar';

interface Props {
  area: Area;
}

export function AreaCard({ area }: Props) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${area.latitude},${area.longitude}`;

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all group"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-rose-600 transition-colors">
        {area.area_name}
      </h3>
      <div className="space-y-2">
        <ScoreBar label="Coffee" value={area.coffee} color="bg-amber-400" />
        <ScoreBar label="Drinks" value={area.drinks} color="bg-rose-400" />
        <ScoreBar label="Nature" value={area.nature} color="bg-green-400" />
        <ScoreBar label="Shopping" value={area.shopping} color="bg-indigo-400" />
      </div>
    </a>
  );
}
