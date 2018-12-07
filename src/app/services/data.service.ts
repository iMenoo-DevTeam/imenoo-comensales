import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RestaurantResponse, Restaurant } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  restaurant: Restaurant = null;

  constructor(private http: HttpClient) { }

  getRestaurant(restaurantUrl) {
    return this.http.get(`${environment.server}/api/restaurant/${restaurantUrl}`);
  }

  setRestaurant(restaurantUrl) {
    this.getRestaurant(restaurantUrl).subscribe((response: RestaurantResponse) => {
      this.restaurant = response.data;
      return this.restaurant;
    });
  }

  unsetRestaurant() {
    this.restaurant = null;
  }
}