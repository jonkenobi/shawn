import { Place } from './models/place';
import { Area } from './models/area';
import { BackendService } from './services/backend.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BackendService],
})
export class AppComponent implements OnInit {
  constructor(private backendService: BackendService) {}
  title = 'Shawn';

  allAreas: [{ [key: string]: any }] = [{}];
  allPlaces: Place[] = [];
  randomAreas: any[] = [];
  suggestions: any = [];
  selected_attr: string = 'search';
  lang = 'JP';
  userPosition: string = '';
  places: Place[] = [];
  UNDER_20_MINS = 0.02;
  UNDER_40_MINS = 0.03;
  UNDER_60_MINS = 0.05;

  ngOnInit() {
    this.backendService.getAreas().subscribe((areas) => {
      this.allAreas = areas;
      // this.setRandomAreas(); uncomment when random is the default tab
    });
    this.backendService.getAllPlaces().subscribe((places) => {
      this.allPlaces = places;
    });
  }

  updatePostion(position: string) {
    this.userPosition = position;
  }

  setRandomAreas() {
    this.selected_attr = 'random';
    const areas = this.allAreas.filter(
      (area) => !this.randomAreas.includes(area)
    );

    var set = new Set();

    while (set.size < 3) {
      var new_random_area = this.getRandomArea(areas);
      set.add(new_random_area);
    }
    this.suggestions = Array.from(set);
  }

  getRandomArea(list: any) {
    const random_place = list[Math.floor(Math.random() * list.length)];
    return random_place;
  }

  filterPlacesByArea(area: Area): Place[] {
    return this.allPlaces.filter(
      (place) =>
        Math.abs(area.longitude - place.longitude) < 0.01 &&
        Math.abs(area.latitude - place.latitude) < 0.01
    );
  }

  getUrl(suggestion: any): string {
    if (!suggestion.latitude) {
      return '#';
    }
    const url = 'https://www.google.com/maps/dir/'.concat(
      this.userPosition,
      '/',
      suggestion.latitude,
      ',',
      suggestion.longitude,
      '/data=!3m1!4b1!4m2!4m1!3e3'
    );
    return url;
  }

  setSearchedAreas(searchParams: any) {
    let areas: any = this.allAreas;
    switch (searchParams.tripDuration) {
      case 1:
        areas = areas.filter((area: any) =>
          this.isCloseEnough(this.UNDER_20_MINS, area.latitude, area.longitude)
        );
        break;
      case 2:
        areas = areas.filter(
          (area: any) =>
            !this.isCloseEnough(
              this.UNDER_20_MINS,
              area.latitude,
              area.longitude
            ) &&
            this.isCloseEnough(
              this.UNDER_40_MINS,
              area.latitude,
              area.longitude
            )
        );
        break;
      case 3:
        areas = areas.filter(
          (area: any) =>
            !this.isCloseEnough(
              this.UNDER_40_MINS,
              area.latitude,
              area.longitude
            ) &&
            this.isCloseEnough(
              this.UNDER_60_MINS,
              area.latitude,
              area.longitude
            )
        );
        break;
      case 4:
          areas = areas.filter(
            (area: any) =>
              !this.isCloseEnough(
                this.UNDER_60_MINS,
                area.latitude,
                area.longitude
              )
          );
          break;
      default:
        break;
    }

    for (const attribute of searchParams.attributes) {
      areas = areas.filter((area: any) => area[attribute] >= 3);
    }

    this.suggestions = areas;
  }

  private isCloseEnough(distance: number, lat: number, long: number): boolean {
    const coords = this.userPosition.split(',');
    let userLat = Number(coords[0]);
    let userLong = Number(coords[1]);

    const diff = Math.abs(lat - userLat) + Math.abs(long - userLong);

    return diff < distance * 2;
  }

  choosePlaceByAttribute(attr: string) {
    this.selected_attr = attr;
    this.suggestions = this.allPlaces.filter((place) => place[attr]);
  }

  getSuggestionClass(suggestion: any): string {
    if (suggestion[this.selected_attr] == 5) {
      return 'first-pick-suggestion';
    }
    if (suggestion[this.selected_attr] == 4) {
      return 'second-pick-suggestion';
    }
    if (suggestion[this.selected_attr]) {
      return 'third-pick-suggestion';
    } else {
      return 'plain-suggestion';
    }
  }

  selectLang(lang: string) {
    this.lang = lang;
  }

  getTitle(): string {
    return this.lang == 'JP' ? '今日はとこへ行く?' : 'Where to today?';
  }
  suggestionName(suggestion: any): string {
    return suggestion.area_name;
    // if (this.lang == 'EN') {
    //   return suggestion.en_name;
    // }
    // if (this.lang == 'JP') {
    //   return suggestion.jp_name;
    // } else {
    //   return suggestion.en_name;
    // }
  }
}
