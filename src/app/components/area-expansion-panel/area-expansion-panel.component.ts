import { Component, OnInit, Input } from '@angular/core';
import { Place } from '../../models/place';

@Component({
  selector: 'app-area-expansion-panel',
  templateUrl: './area-expansion-panel.component.html',
  styleUrls: ['./area-expansion-panel.component.css'],
})
export class AreaExpansionPanelComponent implements OnInit {
  @Input() areaName: string = '';
  @Input() places: Place[] = [];
  @Input() suggestionClass: string = '';
  @Input() areaUrl: string = '#';
  @Input() panelOpenState: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
