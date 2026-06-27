import { useTranslation } from 'react-i18next';
import { myLists } from '../data/lists';
import { ListCard } from './ListCard';

export function ListsTab() {
  const { t } = useTranslation();

  return (
    <div>
      <p className="text-gray-500 text-sm mb-6">{t('lists.subtitle')}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {myLists.map(list => (
          <ListCard key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
}
