import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  @Input() dish: any;
  @Input() section: any;
  @Output() closeView: EventEmitter<any> = new EventEmitter();
  allergens = {  
    almond: { title: 'Almendras' },
    celery: { title: 'Cereales' },
    soybean: { title: 'Soja' },
    sulfates: { title: 'Sulfatos' },
    egg: { title: 'Huevo' },
    milk: { title: 'Leche' },
    gluten: { title: 'Gluten' },
    peanut: { title: 'Maní' },
    sesame: { title: 'Sésamo' },
    mustard: { title: 'Mostaza' },
    mollusc: { title: 'Molusco' },
    lupin: { title: 'Lupus' },
    crustaceans: { title: 'Crustáceos' },
    fish: { title: 'Pescado' },
  }
  constructor() { }

  ngOnInit() {

  }

  closeProductView() {
    this.closeView.emit('hide');
  }

}
