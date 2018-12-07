import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-landing-header',
  templateUrl: './landing-header.component.html',
  styleUrls: ['./landing-header.component.css']
})
export class LandingHeaderComponent implements OnInit {
@Input() restaurant: Restaurant;
@Input() defaultLanguage: String;

  constructor() { }

  ngOnInit() {
    
  }

}
