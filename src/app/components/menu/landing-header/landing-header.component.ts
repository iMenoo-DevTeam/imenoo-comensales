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
      state('showSearch', style({ display: "flex", opacity: 1, transform: "translateY(0)"})),
      state('hideSearch', style({ display: "none", opacity: 0, transform: "translateY(+20%)"})),
      transition('showSearch => hideSearch', animate('300ms ease-in')),
      transition('hideSearch => showSearch', animate('300ms ease-out')),
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
@Output() search: EventEmitter<any> = new EventEmitter();
showLanguages = 'hide';
showFilter = 'hideUp';
showSearch = 'hideSearch';
allergens: Array<any> = [ 
  {  title: 'Almendras', switch: false, value: 'almond' },
  {  title: 'Cereales', switch: false, value: 'celery', },
  {  title: 'Soja', switch: false, value: 'soybean',   },
  {  title: 'Sulfatos', switch: false, value: 'sulfates' },
  {  title: 'Huevo', switch: false, value: 'egg' },
  {  title: 'Leche', switch: false, value: 'milk' },
  {  title: 'Gluten', switch: false, value: 'gluten' },
  {  title: 'Maní', switch: false, value: 'peanut' },
  {  title: 'Sésamo', switch: false, value: 'sesame' },
  {  title: 'Mostaza', switch: false, value: 'mustard' },
  {  title: 'Molusco', switch: false, value: 'mollusc' },
  {  title: 'Lupin', switch: false, value: 'lupin' },
  {  title: 'Crustáceo', switch: false, value: 'crustaceans' },
  {  title: 'Pescado', switch: false, value: 'fish' },
]

dietary: Array<any> = [ 
  {  title: 'Vegano', switch: false, value: 'vegan' },
  {  title: 'Vegetariano', switch: false, value: 'vegetarian' },
]
allergensFilter: Array<String> = [];
dietsFilter: Array<String> = [];
filtersToDisplayAllergens: Array<String> = [];
filtersToDisplayDiets: Array<String> = [];
headerGrow = 'small';
landingBar = true;
searchTerm = '';
sectionsBar = false;
sections = [];
checked: Boolean = false;
canActivate: Boolean = false;
canUseSwitch: Boolean = false;

  constructor() { }

  ngOnInit() {
    this.sections = this.restaurant.menu[0].sections.map(section => { if(section.dishes.length > 0) return {title: section.title, url: section.url, active: section.active, position: section.position, status: 'passive' } });
    if (this.checked) {
      this.canUseSwitch = true;
    } else if (!this.checked && this.canActivate) {
      this.canUseSwitch = true;
    } else {
      this.canUseSwitch = false;
    }
  }

  addFilterAllergen(elem) {
   elem.switch ? this.allergensFilter.push(elem.value) : this.allergensFilter = this.allergensFilter.filter(allergen => allergen != elem.value);
   this.filters.emit({allergens: this.allergensFilter, diets: this.dietsFilter});
   this.addFiltersToDisplay();
  }

  addFilterDiet(elem) {
    elem.switch ? this.dietsFilter.push(elem.value) : this.dietsFilter = this.dietsFilter.filter(diet => diet != elem.value);
    this.filters.emit({allergens: this.allergensFilter, diets: this.dietsFilter});
    this.addFiltersToDisplay();
  }

  addFiltersToDisplay() {
    this.filtersToDisplayAllergens = [];
    this.filtersToDisplayDiets = [];
    this.allergens.forEach(elem => {
      if(elem.switch) this.filtersToDisplayAllergens.push(elem.title)
    });
    this.dietary.forEach(elem => {
      if(elem.switch) this.filtersToDisplayDiets.push(elem.title)
    });
  }

  toggleLanguageSelector() {
    this.showLanguages = 'show';
  }

  showFilterSelector() {
    this.showFilter = 'showUp'
  }

  showSearchBar() {
    this.showSearch = 'showSearch';
  }

  hideSearchBar() {
    this.searchTerm = '';
    this.showSearch = 'hideSearch';
  }

  hideFilterSelector() {
    this.showFilter = 'hideUp'
  }

  newLanguageSelected(lang) {
    this.showLanguages = 'hide';
    this.newLanguage.emit(lang);
  }

  switchAllergen(elem) {
    let switchElemt = this.allergens.filter(filterElem => filterElem.title == elem.title);
    switchElemt[0].switch = !switchElemt[0].switch;
    this.addFilterAllergen(switchElemt[0]);
  }

  switchDiet(elem) {
    let switchElemt = this.dietary.filter(filterElem => filterElem.title == elem.title);
    switchElemt[0].switch = !switchElemt[0].switch;
    this.addFilterDiet(switchElemt[0]);
  }

  scrollToSection(position) {
    window.scrollTo(0, position-130);
  }

  getSearchValue(event) {
    this.searchTerm = event.target.value;
    this.search.emit(this.searchTerm);
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
