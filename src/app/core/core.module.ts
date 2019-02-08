import { AuthInterceptor } from './../security/auth.interceptor';
import { LoggedInGuard } from './../security/loggedin.guard';
import { NgModule } from "@angular/core";
import { LoginService } from './../security/login/login.service';
import { OrderServices } from "../order/order.service"
import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart.service"
import { RestaurantServices } from "../restaurants/restaurant.service"

import { NotificationService } from "../shared/messages/notifications.service";
import { LeaveOrderGuard } from './../order/leave-order.guard';
import { HTTP_INTERCEPTORS } from "@angular/common/http";

@NgModule({
    providers: [OrderServices,
        ShoppingCartService,
        RestaurantServices,
        NotificationService,
        LoginService,
        LoggedInGuard,
        LeaveOrderGuard,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }] //AuthInterceptor vai pegar todos meus request, multi: ele pega mais de um valor
})
export class CoreModule { }