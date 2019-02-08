import { LoginService } from 'app/security/login/login.service';
import { Observable } from 'rxjs/Observable';
import { Route, CanLoad, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {


    constructor(private _loginService: LoginService) {

    }

    private checkAuthentication(path: string): boolean {
        const logado = this._loginService.isLoggedId()
        if (!logado) {
            this._loginService.handlelogin(`/${path}`)
        }
        return logado;
    }

    /*se modulos vaõ poder ser carregados*/
    // canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    //     throw new Error("Method not implemented.");
    // }
    canLoad(route: Route): boolean {
        // const logado = this._loginService.isLoggedId()
        // if (!logado) {
        //     this._loginService.handlelogin(`/${route.path}`)
        // }
        // console.log(route)
        console.log("CANLOAD");
        return this.checkAuthentication(route.path);
    }

    //se pode entrar
    canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
        //RouterStateSnapshot todos os caminhos ate essa rota
        console.log("CANACTIVATE");
        return this.checkAuthentication(activatedRoute.routeConfig.path);
    }



}