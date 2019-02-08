import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; //veio para substitui o HTTPMODULE
import { RouterModule, PreloadAllModules } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { LocationStrategy, HashLocationStrategy } from "@angular/common"; //para solucionar os problema de url no servidor de aplicação com #

//minhas rotas
import { ApplicationErrorHandler } from 'app/app.error-handler';
import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
//import { AboutComponent } from './about/about.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantComponent } from './restaurants/restaurant/restaurant.component'
//import { RestaurantServices } from './restaurants/restaurant.service';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { MenuComponent } from './restaurant-detail/menu/menu.component';
import { ShoppingCartComponent } from './restaurant-detail/shopping-cart/shopping-cart.component';
import { MenuItemComponent } from './restaurant-detail/menu-item/menu-item.component';
import { ReviewsComponent } from './restaurant-detail/reviews/reviews.component'
//import { ShoppingCartService } from "./restaurant-detail/shopping-cart/shopping-cart.service";
//import { OrderComponent } from './order/order.component';
//import { InputComponent } from './shared/input/input.component';
//import { RadioComponent } from './shared/radio/radio.component';
//import { OrderItemsComponent } from './order/order-items/order-items.component';
//import { OrderServices } from "./order/order.service";
//import { DeliveryCostsComponent } from './order/delivery-costs/delivery-costs.component';
import { OrderSummaryComponent } from './order/order-summary/order-summary.component';
//import { RatingComponent } from './shared/rating/rating.component';

import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core/core.module";
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './security/login/login.component';
import { UserDetailComponent } from './header/user-detail/user-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    //   AboutComponent,
    RestaurantsComponent,
    RestaurantComponent,
    RestaurantDetailComponent,
    MenuComponent,
    ShoppingCartComponent,
    MenuItemComponent,
    ReviewsComponent,
    //  OrderComponent,
    //   InputComponent,
    //   RadioComponent,
    //   OrderItemsComponent,
    //   DeliveryCostsComponent,
    OrderSummaryComponent,
    NotFoundComponent,
    LoginComponent,
    UserDetailComponent,
    DashboardComponent
    //  RatingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, //para o novo httpClient
    //  HttpModule,    
    RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules }), //ROTAS ADICIONADAS //preloadingStrategy: PreloadAllModules , carrega os ourto modulos em segungo plano em outra treed
    //FormsModule,
    //ReactiveFormsModule,
    SharedModule,
    CoreModule,
    BrowserAnimationsModule
  ],
  //providers: [RestaurantServices, ShoppingCartService, OrderServices, { provide: LOCALE_ID, useValue: 'pt-BR' }], /* se declarado aqui no module global ele vai esta disponivel para todos os modulos*/
  providers: [ /* Os providers de SERVICES foram para o COREMODULE */
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: ErrorHandler, useClass: ApplicationErrorHandler }], //SERVICO DE ERRO GLOBAL
  bootstrap: [AppComponent]
})
export class AppModule { }


//{ provide: LocationStrategy, useClass: HashLocationStrategy } para resolver problemas de URL no servidor de aplicação
