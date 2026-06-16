import type { MyList } from '../types';

// To get a Google My Maps ID:
// 1. Go to mymaps.google.com and open your map
// 2. Click Share → copy the URL
// 3. The ID is the long string after /d/ in the URL
// Replace the myMapsId values below with your actual map IDs.

export const myLists: MyList[] = [
  {
    id: 'ramen',
    name: 'Ramen',
    emoji: '🍜',
    description: "Jon's favourite ramen spots across Tokyo",
    myMapsId: null, // replace with your My Maps ID e.g. '1sM34DaCOyh65Kv0i3ZaKMXcqc_pR3v'
    linkUrl: null,
  },
  {
    id: 'bars',
    name: 'Bars & Pubs',
    emoji: '🍺',
    description: 'Best bars for a late night out',
    myMapsId: null,
    linkUrl: null,
  },
  {
    id: 'italian',
    name: 'Italian',
    emoji: '🍝',
    description: 'Italian spots worth travelling across the city for',
    myMapsId: null,
    linkUrl: null,
  },
  {
    id: 'cafes',
    name: 'Cafes & Coffee',
    emoji: '☕',
    description: 'Where to work or catch up over a good cup',
    myMapsId: null,
    linkUrl: null,
  },
  {
    id: 'korean',
    name: 'Korean',
    emoji: '🥩',
    description: 'Yakiniku, Korean BBQ and more',
    myMapsId: null,
    linkUrl: null,
  },
  {
    id: 'mexican',
    name: 'Mexican',
    emoji: '🌮',
    description: 'Best Mexican and Latin spots in the city',
    myMapsId: null,
    linkUrl: null,
  },
];
