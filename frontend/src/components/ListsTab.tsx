import { myLists } from '../data/lists';
import { ListCard } from './ListCard';

export function ListsTab() {
  return (
    <div>
      <p className="text-gray-500 text-sm mb-5">
        Jon's curated Google Maps lists. Add your My Maps IDs in <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">src/data/lists.ts</code> to enable inline map embeds.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {myLists.map(list => (
          <ListCard key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
}
