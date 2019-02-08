import { User } from './../../security/login/user.model';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/security/login/login.service';

@Component({
  selector: 'mt-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  constructor(private _loginService: LoginService) { }

  ngOnInit() {
  }

  user(): User {
    return this._loginService.user
  }

  isLoggedIn(): boolean {
    return this._loginService.isLoggedId()
  }

  login() {
    this._loginService.handlelogin()
  }

  logout() {
    this._loginService.logout()
  }

}
