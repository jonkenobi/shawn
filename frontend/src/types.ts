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
  emoji: string;
  linkUrl: string | null;
}
