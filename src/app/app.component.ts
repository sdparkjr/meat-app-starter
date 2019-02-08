import {Component, OnInit} from "@angular/core"

@Component({
  selector: 'mt-app',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  content = 'Bem Vindo do Meat App!'

  constructor() { }

  ngOnInit() {
  }

}
