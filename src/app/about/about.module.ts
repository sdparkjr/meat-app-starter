import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";

import { AboutComponent } from "./about.component";


const ROUTES: Routes = [
    { path: '', component: AboutComponent }
]

/*FEATURE MODULE*/

/*Vamos carrega so quando for solicitado, assim temos que configurar sua s rotas separadas  ro ta padrão*/

@NgModule({
    declarations: [AboutComponent],
    imports: [RouterModule.forChild(ROUTES)] /* forChild como ele vai ser rotas filhas*/
})
export class AboutModule { }