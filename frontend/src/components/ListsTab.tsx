import { myLists } from '../data/lists';
import { ListCard } from './ListCard';

export function ListsTab() {
  return (
    <div>
      <p className="text-gray-500 text-sm mb-5">
        Jon's curated lists — tap any card to open it in Google Maps.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {myLists.map(list => (
          <ListCard key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
}
