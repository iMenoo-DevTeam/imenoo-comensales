export class Response {
  data: Object;
  status: Number;
}
export class RestaurantResponse {
  data: Restaurant;
  status: Number;
}
export class MenuResponse {
  data: Menu;
  status: Number;
}
export class SectionResponse {
  data: Section;
  status: Number;
}
export class Restaurant {
  location: {
    coordinates: Array<any>;
  };
  bg_image: String;
  status: String;
  menu: Array<Menu>;
  plan: String;
  sign_date: Date;
  last_payment: Date;
  currency: String;
  email: String;
  name: String;
  country: String;
  city: String;
  address: String;
  phone: Number;
  url: String;
  next_payment: Date;
}

export class Menu {
  _id: String;
  language: String;
  translations: {
    es: String;
    en: String;
    ru: String;
    cn: String;
    fr: String;
    it: String;
    de: String;
    pt: String;
    jp: String;
  };
  active: Boolean;
  display: Boolean;
  sections: Array<any>;
  promotions: Array<any>;
  default_language: String;
}
export class Section {
  translations: {
    es: String;
    en: String;
    ru: String;
    cn: String;
    fr: String;
    it: String;
    de: String;
    pt: String;
    jp: String;
  };
  type: String;
  dishes: Array<object>;
  _id: String;
  title: String;
  default_language: String;
}
