export interface Area {
  area_name: string;
  latitude: number;
  longitude: number;
  drinks: number;
  coffee: number;
  nature: number;
  shopping: number;
}

export interface MyList {
  id: string;
  name: string;
  emoji: string;
  description: string;
  linkUrl: string | null;
}
