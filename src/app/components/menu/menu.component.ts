import { Component, OnInit, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { RestaurantResponse, Restaurant } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('showAnimation', [
      state('show', style({ opacity: 1, transform: "translateX(0)"})),
      state('hide', style({ opacity: 0, transform: "translateX(-5%)"})),
      transition('show => hide', animate('600ms ease-in')),
      transition('hide => show', animate('600ms ease-out')),
    ])
  ]
})
export class MenuComponent implements OnInit {
  restaurant: any = null;
  restaurantUrl: any = '';
  defaultLanguage: any = '';
  rawRestaurant: Restaurant;
  availableLanguages: String[] = [];
  allergensFilter = [];
  dietsFilter = [];
  showHeader = 'show';

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public dataService: DataService,
  ) { 
    this.activatedRoute.params.subscribe(params => {
      this.restaurantUrl = params.restaurantUrl;
      this.dataService.getRestaurant(params.restaurantUrl).subscribe((response: RestaurantResponse) => {
        this.defaultLanguage = response.data.menu[0].default_language;
        this.rawRestaurant = response.data;
        this.availableLanguages = this.getAvailableLanguages(response.data.menu[0]);
        this.restaurant = this.filterLanguage(response.data);
      });
    });
  }

  ngOnInit() {
  }

  getAvailableLanguages(menu) {
    let languages = Object.keys(menu.translations);
    let values = Object.values(menu.translations);
    return languages.filter((langElem,i) => values[i] != "");
  }
  
  filterLanguage(restaurant) {
    const newRestaurant = Object.create(restaurant);
    newRestaurant.menu = newRestaurant.menu.map((menuElem) => {
      const newMenu = { title: menuElem.translations[this.defaultLanguage], sections: [] };
      newMenu.sections = menuElem.sections.map((sectionElem) => {
        const newSection = { title: sectionElem.translations[this.defaultLanguage], dishes: [], url: sectionElem.translations[this.defaultLanguage].replace(/ /g, "-").toLowerCase() };
        sectionElem.dishes.forEach((dishElem) => {
          const newDish = {
            title: dishElem.translations[this.defaultLanguage].title,
            description: dishElem.translations[this.defaultLanguage].description,
            price: dishElem.price+restaurant.currency,
            allergens: dishElem.allergens,
            diets: dishElem.diets,
            active: dishElem.active,
            flagAllergens: true,
            flagDiets: true,
            image: dishElem.image,
          };
          this.allergensFilter.forEach(allergen => { if(newDish.allergens[allergen]) newDish.flagAllergens = false; })
          this.dietsFilter.forEach(diet => { if(!newDish.diets[diet]) newDish.flagDiets = false; })
          if(newDish.flagAllergens && newDish.flagDiets) newSection.dishes.push(newDish);
        })
        return newSection;
      })
      return newMenu;
    })
    return newRestaurant;
  }

  setNewLanguage(lang) {
    this.defaultLanguage = lang;
    this.restaurant = this.filterLanguage(this.rawRestaurant);
  }

  setFilters(filters) {
    this.allergensFilter = filters.allergens;
    this.dietsFilter = filters.diets;
    this.restaurant = this.filterLanguage(this.rawRestaurant);
  }
}
