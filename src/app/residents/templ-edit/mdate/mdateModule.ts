import { MdateComponent } from './mdate.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    MdateComponent,
  ],
  imports: [
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MdateComponent,
  ]
})
export class MdateModule { }