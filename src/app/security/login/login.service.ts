import { MEAT_API } from './../../app.api';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Router, NavigationEnd } from '@angular/router/';

import 'rxjs/add/operator/do'; // para obtermos a referencia antes da passarmos para o componente
import 'rxjs/add/operator/filter'; //filtra nosso observable






@Injectable()
export class LoginService {

    user: User
    lastUrl: string

    constructor(private _http: HttpClient, private _router: Router) {
        /*pegar todas as rotas que o cara passou*/
        this._router.events.filter(e => e instanceof NavigationEnd) //tipamos o filtro para sempre recebr a ultima navegação do usuario
            .subscribe((e: NavigationEnd) => this.lastUrl = e.url);
    }

    login(email: string, password: string): Observable<User> {

        return this._http.post<User>(`${MEAT_API}/login`, { email: email, password: password })
            .do(user => this.user = user); /*referenciar nosso usuario antes de passar ao componente a resposta*/

    }

    isLoggedId(): boolean {
        return this.user != undefined
    }

    handlelogin(url: string = this.lastUrl) {
        debugger;
        this._router.navigate(['/login', btoa(url)]); //btoa para passar para BASE64

    }

    logout() {
        this.user = undefined
    }

}