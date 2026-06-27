import { useTranslation } from 'react-i18next';
import type { MyList } from '../types';

interface Props {
  list: MyList;
}

export function ListCard({ list }: Props) {
  const { t } = useTranslation();
  const name = t(`lists.items.${list.id}.name`);
  const description = t(`lists.items.${list.id}.description`);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-full flex flex-col">
      <div className="p-8 flex flex-col flex-1">
        <span className="text-3xl mb-5 block">{list.emoji}</span>
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500 mt-2.5">{description}</p>

        <div className="flex gap-3 mt-auto pt-7">
          {list.linkUrl ? (
            <a
              href={list.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 px-4 rounded-xl text-sm font-medium text-center border border-gray-200 text-gray-700 hover:border-gray-400 transition-colors"
            >
              {t('lists.openInMaps')}
            </a>
          ) : (
            <span className="text-xs text-gray-400 italic mt-2">{t('lists.missingLink')}</span>
          )}
        </div>
      </div>
    </div>
  );
}
