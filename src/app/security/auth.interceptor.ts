import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpInterceptor } from "@angular/common/http/src/interceptor";
import { HttpRequest, HttpUserEvent, HttpHandler, HttpEvent } from "@angular/common/http";
import { LoginService } from 'app/security/login/login.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    //constructor(private loginService: LoginService) { }
    //Injector ele pode pegar qualquer referencia que esta dentro dos services
    constructor(private _injector: Injector) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const loginService = this._injector.get(LoginService)

        if (loginService.isLoggedId()) {
            //request é um objeto inmultavel por isso o clone dele 
            const authRequest = request.clone(
                { setHeaders: { 'Authorization': `Bearer ${loginService.user.accessToken}` } }
            );

            return next.handle(authRequest)
        } else {
            return next.handle(request) //fluxo padrao
        }

        // let head = new HttpHeaders()
        // if (this._loginService.isLoggedId()) { /*se estiver logado*/
        //     head = head.set('Authorization', `Bearer ${this.loginService.user.accessToken}`)
        // }

        //next representa o proximo obj para chamado do proximo        
        //console.log("intercept :", request)
        //return next.handle(request)

    }

}