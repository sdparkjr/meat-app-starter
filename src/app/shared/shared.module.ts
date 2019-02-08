import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { InputComponent } from './input/input.component'
import { RadioComponent } from './radio/radio.component'
import { RatingComponent } from './rating/rating.component'
import { SnackbarComponent } from './messages/snackbar/snackbar.component'

//import { NotificationService  } from "./messages/notifications.service";

@NgModule({
    declarations: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule], /*vão ser dependencia desse nosso module compartilhado*/
    exports: [InputComponent, RadioComponent, RatingComponent,
        CommonModule, FormsModule, ReactiveFormsModule, SnackbarComponent]
})
export class SharedModule { }


