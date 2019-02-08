import { LoggedInGuard } from 'app/security/loggedin.guard';
import { Routes } from '@angular/router'

import { HomeComponent } from './home/home.component'
//import { AboutComponent } from './about/about.component'
import { RestaurantsComponent } from './restaurants/restaurants.component'
import { RestaurantDetailComponent } from "./restaurant-detail/restaurant-detail.component";
import { MenuComponent } from "./restaurant-detail/menu/menu.component";
import { ReviewsComponent } from "./restaurant-detail/reviews/reviews.component";
import { NotFoundComponent } from "./not-found/not-found.component";

//import { OrderComponent } from "./order/order.component";
import { OrderSummaryComponent } from "./order/order-summary/order-summary.component";
import { LoginComponent } from './security/login/login.component';

export const ROUTES: Routes = [

    { path: '', component: HomeComponent },
    { path: 'login/:to', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'restaurants', component: RestaurantsComponent },
    {
        path: 'restaurants/:id', component: RestaurantDetailComponent,
        children: [ /*Menu filhos das paginas*/
            { path: '', redirectTo: 'menu', pathMatch: 'full' }, /*default na 1° vez que nao possui nada*/
            { path: 'menu', component: MenuComponent },
            { path: 'reviews', component: ReviewsComponent }
        ]
    },
    { path: 'about', loadChildren: './about/about.module#AboutModule'}, /*Configurando lazyLoading para o sobre para ele se carregado so quando é solicitado*/
    { path: 'order', loadChildren: './order/order.module#OrderModule', canLoad: [LoggedInGuard], canActivate: [LoggedInGuard] }, /*Configurando lazyLoading para o sobre para ele se carregado so quando é solicitado*/
    { path: 'order-summary', component: OrderSummaryComponent },
    { path: '**', component: NotFoundComponent } /*Ele tem que ficar sempre no final */

]

