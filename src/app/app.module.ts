import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { DishCardComponent } from './components/menu/dish-card/dish-card.component';
import { LandingHeaderComponent } from './components/menu/landing-header/landing-header.component';
import { FooterComponent } from './components/menu/footer/footer.component';
import { SectionsNavComponent } from './components/menu/sections-nav/sections-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    DishCardComponent,
    LandingHeaderComponent,
    FooterComponent,
    SectionsNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
