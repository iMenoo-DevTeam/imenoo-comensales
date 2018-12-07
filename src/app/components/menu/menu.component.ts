import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { RestaurantResponse, Restaurant } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  restaurant: any = null;
  defaultLanguage: String = '';
  availableLanguages: String[] = [];
  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public dataService: DataService,
  ) { 
    this.activatedRoute.params.subscribe(params => {
      this.dataService.getRestaurant(params.restaurantUrl).subscribe((response: RestaurantResponse) => {
        this.defaultLanguage = response.data.menu[0].default_language;
        this.restaurant = this.filterLanguage(response.data);
      });
    });
  }

  ngOnInit() {
  }

  getAvailableLanguages() {

  }
  
  filterLanguage(restaurant) {
    restaurant.menu = restaurant.menu.map((menuElem) => {
      const newMenu = { title: menuElem.translations[this.defaultLanguage], sections: [] };
      newMenu.sections = menuElem.sections.map((sectionElem) => {
        const newSection = { title: sectionElem.translations[this.defaultLanguage], dishes: [] };
        newSection.dishes = sectionElem.dishes.map((dishElem) => {
          return {
            title: dishElem.translations[this.defaultLanguage].title,
            description: dishElem.translations[this.defaultLanguage].description,
            price: dishElem.price+restaurant.currency,
            allergens: dishElem.allergens,
            diets: dishElem.diets,
            active: dishElem.active,
          }
        })
        return newSection;
      })
      return newMenu;
    })
    return restaurant;
  }
}
