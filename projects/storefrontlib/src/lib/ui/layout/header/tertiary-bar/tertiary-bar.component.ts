import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'y-tertiary-bar',
  templateUrl: './tertiary-bar.component.html',
  styleUrls: ['./tertiary-bar.component.scss']
})
export class TertiaryBarComponent implements OnInit {
  tertiaryNavItems: any[] = [
    {
      label: 'Sale',
      url: '#'
    },
    {
      label: 'Find a store',
      url: '#'
    },
    {
      label: 'Contact us',
      url: '#'
    },
    {
      label: 'Help',
      url: '#'
    }
  ];
  constructor() {}

  ngOnInit() {}
}