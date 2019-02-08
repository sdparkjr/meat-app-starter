import { ErrorHandler, Injectable, Injector, NgZone } from "@angular/core";
import { LoginService } from './security/login/login.service';
import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { NotificationService } from "app/shared/messages/notifications.service";

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

    constructor(private _ns: NotificationService,
        private _injector: Injector,
        private zone: NgZone) {
        super();
    }

    handleError(errorResponse: HttpErrorResponse | any) {
        debugger
        if (errorResponse instanceof HttpErrorResponse) { //se erroResponse foi uma instacia de HttpErrorResponse

            const message = errorResponse.error.message;
            this.zone.run(() => { //zone criado pq as mensagens estavam saindo atrasadas, assim ele vai pegar a zona do angular e obdecer

                switch (errorResponse.status) {
                    case 401:
                        this._injector.get(LoginService).handlelogin() //vai chamar a tela de login
                        break;
                    case 403: //proibido
                        this._ns.notify(message || 'Não autorizado')
                        break;
                    case 404:
                        this._ns.notify(message || 'Recurso não encontrado...')
                        break;
                }

            });
        }

        // this._ns.notify('asas')
        // console.log("ERRO handler")
        super.handleError(errorResponse)
    }
    //response ou qualque UM
    // static handleError(error: Response | any) {
    //     let errorMessage: string

    //     if (error instanceof Response) {
    //         errorMessage = `Erro ${error.status} ao acessar a URL ${error.url} - ${error.statusText}`
    //     } else {
    //         errorMessage = error.toString()
    //     }

    //     console.log(errorMessage)
    //     return Observable.throw(errorMessage)

    // }

    //apos o HTTPCLIENT
    // static handleError(error: HttpErrorResponse | any) {
    //     let errorMessage: string

    //     if (error instanceof HttpErrorResponse) {
    //         const body = error.error;
    //         //errorMessage = `Erro ${error.status} ao acessar a URL ${error.url} - ${body}`
    //         errorMessage = `Erro ${error.status} - ${error.statusText || ''} ao acessar a URL ${error.url} - ${body}`
    //     } else {
    //         errorMessage = error.toString();
    //     }

    //     console.log(errorMessage)
    //     return Observable.throw(errorMessage)

    // }


}