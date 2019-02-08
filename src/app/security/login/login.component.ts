import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'app/shared/messages/notifications.service';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  navigateTo: string

  constructor(private fb: FormBuilder,
    private _loginServ: LoginService,
    private _notifyService: NotificationService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    })

    this.navigateTo = this._activatedRoute.snapshot.params['to'] || btoa('/')
    //btoa para passar para BASE64
     
  }


  login() {

    //como é um Obsevable precisamos usar o Subscribe para receber o valor
    this._loginServ.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(resposta =>
        this._notifyService.notify(`Bem vindo,${resposta.name}`),
      response =>
        this._notifyService.notify(response.error.message), //HttpErrorResponse ele é do tido HttpHandler
      () => {
        this._router.navigate([atob(this.navigateTo)]) /*apos tudo vai navegar para URL recebida*/

        //atob() para retirar de BASE64
      }
      )

  }

}
