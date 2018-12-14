import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.css'],
  animations: [
    trigger('showAnimation', [
      state('show', style({ left: 0, opacity: 1, transform: "translateX(0)"})),
      state('hide', style({ left: "100vw", opacity: 0, transform: "translateX(100%)"})),
      transition('show => hide', animate('600ms ease-in')),
      transition('hide => show', animate('600ms ease-out')),
    ])
  ]
})
export class DishCardComponent implements OnInit {
  @Input() dish: any;
  @Input() section: any;
  showFullInfo = 'hide';

  constructor() {
 
  }

  ngOnInit() {
  }

  showFullDish() {
    this.showFullInfo = 'show';
  }

  closeView(event) {
    this.showFullInfo = event;
  }

}
