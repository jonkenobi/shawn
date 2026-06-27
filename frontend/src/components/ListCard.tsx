import { useState } from 'react';
import type { MyList } from '../types';

interface Props {
  list: MyList;
}

export function ListCard({ list }: Props) {
  const [expanded, setExpanded] = useState(false);
  const canEmbed = !!list.myMapsId;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-full flex flex-col">
      <div className="p-8 flex flex-col flex-1">
        <span className="text-3xl mb-5 block">{list.emoji}</span>
        <h3 className="text-lg font-semibold text-gray-900">{list.name}</h3>
        <p className="text-sm text-gray-500 mt-2.5">{list.description}</p>

        <div className="flex gap-3 mt-auto pt-7">
          {canEmbed && (
            <button
              onClick={() => setExpanded(e => !e)}
              className="flex-1 py-2 px-4 rounded-xl text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 transition-colors"
            >
              {expanded ? 'Hide map' : 'View on map'}
            </button>
          )}
          {list.linkUrl && (
            <a
              href={list.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 px-4 rounded-xl text-sm font-medium text-center border border-gray-200 text-gray-700 hover:border-gray-400 transition-colors"
            >
              Open in Maps ↗
            </a>
          )}
          {!canEmbed && !list.linkUrl && (
            <span className="text-xs text-gray-400 italic mt-2">Add your My Maps ID or link URL in src/data/lists.ts</span>
          )}
        </div>
      </div>

      {expanded && canEmbed && (
        <div className="border-t border-gray-100">
          <iframe
            title={list.name}
            src={`https://www.google.com/maps/d/embed?mid=${list.myMapsId}&ehbc=2E312F`}
            width="100%"
            height="400"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}
