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
  selected_attr: string = 'random';
  lang = 'JP';
  userPosition: string = '';
  places: Place[] = [];

  ngOnInit() {
    this.backendService.getAreas().subscribe((areas) => {
      this.allAreas = areas;
      this.setRandomAreas();
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

  getUrl(suggestion: any):string{
    if(!suggestion.latitude){
      return "#";
    }
    const url = "https://www.google.com/maps/dir/".concat(this.userPosition,"/",
    suggestion.latitude,",",suggestion.longitude,"/data=!3m1!4b1!4m2!4m1!3e3")
    return url;
  }

  choose_place_by_attribute(attr: string) {
    this.selected_attr = attr;
    this.suggestions = this.allPlaces.filter(
      place=>place[attr]
    )
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
    return this.lang == 'JP' ? '?????????????????????????' : 'Where to today?';
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
