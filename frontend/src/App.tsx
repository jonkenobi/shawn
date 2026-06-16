import { useState } from 'react';
import { AreasTab } from './components/AreasTab';
import { ListsTab } from './components/ListsTab';

type Tab = 'areas' | 'lists';

export default function App() {
  const [tab, setTab] = useState<Tab>('lists');

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="page-inner py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight leading-none">Jon's Tokyo</h1>
            <p className="text-sm text-gray-400 mt-2">Favourite spots &amp; areas</p>
          </div>
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setTab('lists')}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                tab === 'lists' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📍 My Lists
            </button>
            <button
              onClick={() => setTab('areas')}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                tab === 'areas' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              🗺️ Areas
            </button>
          </div>
        </div>
      </header>

      <main className="page-inner py-8">
        {tab === 'areas' ? <AreasTab /> : <ListsTab />}
      </main>
    </div>
  );
}
