import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AreasTab } from './components/AreasTab';
import { ListsTab } from './components/ListsTab';

type Tab = 'areas' | 'lists';

export default function App() {
  const { t, i18n } = useTranslation();
  const [tab, setTab] = useState<Tab>('lists');

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="page-inner py-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight leading-none">{t('header.title')}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
              <button
                onClick={() => setTab('lists')}
                className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  tab === 'lists' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                📍 {t('tabs.lists')}
              </button>
              <button
                onClick={() => setTab('areas')}
                className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  tab === 'areas' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                🗺️ {t('tabs.areas')}
              </button>
            </div>
            <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
              <button
                onClick={() => i18n.changeLanguage('en')}
                aria-label={t('language.label')}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  i18n.resolvedLanguage === 'en' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => i18n.changeLanguage('ja')}
                aria-label={t('language.label')}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  i18n.resolvedLanguage === 'ja' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                日本語
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="page-inner py-8">
        {tab === 'areas' ? <AreasTab /> : <ListsTab />}
      </main>
    </div>
  );
}
