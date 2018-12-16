import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Restaurant } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-landing-header',
  templateUrl: './landing-header.component.html',
  styleUrls: ['./landing-header.component.css'],
  animations: [
    trigger('showAnimation', [
      state('show', style({ display: "flex", opacity: 1, transform: "translateX(0)"})),
      state('hide', style({ display: "none", opacity: 0, transform: "translateX(+5%)"})),
      transition('show => hide', animate('300ms ease-in')),
      transition('hide => show', animate('300ms ease-out')),
      state('showUp', style({ display: "block", opacity: 1, transform: "translateY(0)"})),
      state('hideUp', style({ display: "none", opacity: 0, transform: "translateY(-10%)"})),
      transition('showUp => hideUp', animate('300ms ease-in')),
      transition('hideUp => showUp', animate('300ms ease-out')),
      state('grow', style({ width: "100%", borderRadius: '0px', height: 'auto', top: 0, left: 0, position: "fixed", marginBottom: '50px', marginTop: '0px'})),
      state('small', style({ position: "relative", marginTop: '-25px', width: "80%", marginBottom: '0px'})),
      transition('grow => small', animate('100ms ease-in')),
      transition('small => grow', animate('300ms ease-out')),
      state('active', style({ backgroundColor: '#4A4A4A', color: '#fff', borderRadius: '360px'})),
      state('passive', style({ backgroundColor: '#fff', color: '#4A4A4A', borderRadius: '0px'})),
      transition('active => passive', animate('500ms ease-in')),
      transition('passive => active', animate('500ms ease-out')),
    ])
  ]
})
export class LandingHeaderComponent implements OnInit {
@Input() restaurant: Restaurant;
@Input() defaultLanguage: String;
@Input() availableLanguages: String;
@Output() newLanguage: EventEmitter<any> = new EventEmitter();
@Output() filters: EventEmitter<any> = new EventEmitter();
showLanguages = 'hide';
showFilter = 'hideUp';
allergens: Array<Object> = [ 
  {  title: 'Almendras', value: 'almond' },
  {  title: 'Cereales', value: 'celery', },
  {  title: 'Soja', value: 'soybean',   },
  {  title: 'Sulfatos', value: 'sulfates' },
  {  title: 'Huevo', value: 'egg' },
  {  title: 'Leche', value: 'milk' },
  {  title: 'Gluten', value: 'gluten' },
  {  title: 'Maní', value: 'peanut' },
  {  title: 'Sésamo', value: 'sesame' },
  {  title: 'Mostaza', value: 'mustard' },
  {  title: 'Molusco', value: 'mollusc' },
  {  title: 'Lupin', value: 'lupin' },
  {  title: 'Crustáceo', value: 'crustaceans' },
  {  title: 'Pescado', value: 'fish' },
]
dietary: Array<Object> = [ 
  {  title: 'Vegano', value: 'vegan' },
  {  title: 'Vegetariano', value: 'vegetarian' },
]
allergensFilter: Array<String> = [];
dietsFilter: Array<String> = [];
headerGrow = 'small';
landingBar = true;
sectionsBar = false;
sections = [];
  constructor() { }

  ngOnInit() {
    this.sections = this.restaurant.menu[0].sections.map(section => { return {title: section.title, url: section.url, active: section.active, position: section.position, status: 'passive' } });
  }

  addFilterAllergen(event, data) {
    event.target.checked ? this.allergensFilter.push(data) : this.allergensFilter = this.allergensFilter.filter(allergen => allergen != data)
    this.filters.emit({allergens: this.allergensFilter, diets: this.dietsFilter});
  }

  addFilterDiet(event, data) {
    event.target.checked ? this.dietsFilter.push(data) : this.dietsFilter = this.dietsFilter.filter(diet => diet != data);
    this.filters.emit({allergens: this.allergensFilter, diets: this.dietsFilter});
  }

  toggleLanguageSelector() {
    this.showLanguages = 'show';
  }

  showFilterSelector() {
    this.showFilter = 'showUp'
  }

  hideFilterSelector() {
    this.showFilter = 'hideUp'
  }

  newLanguageSelected(lang) {
    this.showLanguages = 'hide';
    this.newLanguage.emit(lang);
  }

  scrollToSection(position) {
    window.scrollTo(0, position-130);
  }

  checkCurrentSection(scrollPosition) {
    let headerHeight = 0;
    const elementsforAnimation = document.querySelectorAll('.section');
    const sectionsWrapper = <HTMLElement> document.querySelector('.sections-wrapper ul');
    const headerElement = <HTMLElement> document.querySelector('.header-bar .sections-wrapper');
    if(headerElement) { headerHeight = headerElement.clientHeight }
    
    for(let i=0; i<elementsforAnimation.length; i++) {
      const elementPosition = <HTMLElement> elementsforAnimation[i];
      const item = elementPosition.getAttribute('section');
      this.sections.forEach((elem, i) => {
        if(elem.url == item && elem.position !== elementPosition.offsetTop) elem.position = elementPosition.offsetTop;
        if(scrollPosition+headerHeight+40 > elem.position) {
          if(i+1 < this.sections.length) {
            if(scrollPosition+headerHeight+40 < this.sections[i+1].position) {
              elem.status = 'active'
              let elemActivePosition = <HTMLElement> document.querySelector(`[section="${elem.url}"]`);
              if(sectionsWrapper) sectionsWrapper.scrollTo(elemActivePosition.offsetLeft-24, 0);
            } else {
             elem.status = 'passive';
            }
          } else {
            elem.status = 'active';
            let elemActivePosition = <HTMLElement> document.querySelector(`[section="${elem.url}"]`);
            if(sectionsWrapper) sectionsWrapper.scrollTo(elemActivePosition.offsetLeft-24, 0);
          }
        } else elem.status = 'passive'
      })
    }
  }

  showHeaderBar(scrollPosition) {
    const headerBar = document.getElementsByClassName('header-bar')[0];
    const headerLanding = document.getElementsByClassName('header-landing')[0];
    const elementHeader= <HTMLElement> headerBar;
    const elementLanding = <HTMLElement> headerLanding;
    if(scrollPosition >= elementHeader.offsetTop) {
      this.headerGrow = 'grow';
      this.landingBar = false;
      this.sectionsBar = true;
    }
    if(scrollPosition <= headerLanding.clientHeight-25) {
      this.headerGrow = 'small';
      this.landingBar = true;
      this.sectionsBar = false;
    }
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition = window.pageYOffset;
    this.showHeaderBar(scrollPosition);
    this.checkCurrentSection(scrollPosition);
  }

}
