import { Component, OnInit } from '@angular/core';
import data from '../info' 

@Component({
  selector: 'app-info-section',
  templateUrl: './info-section.component.html',
  styleUrls: ['./info-section.component.scss']
})
export class InfoSectionComponent implements OnInit {
  heading = data.title;
  items = data.items;

  constructor() { }

  ngOnInit(): void {
  }

}
