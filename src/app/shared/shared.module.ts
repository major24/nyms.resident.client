import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MeetingActionItemEditTmplComponent } from '../common/templates/meeting-action-item-edit-tmpl/meeting-action-item-edit-tmpl.component';
import { MeetingActionEditTmplComponent } from '../common/templates/meeting-action-edit-tmpl/meeting-action-edit-tmpl.component';
import { MeetingActionEditPopupTmplComponent } from '../common/templates/meeting-action-edit-popup-tmpl/meeting-action-edit-popup-tmpl.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  declarations:[
    MeetingActionItemEditTmplComponent,
    MeetingActionEditTmplComponent,
    MeetingActionEditPopupTmplComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    NgbModule,
    MeetingActionItemEditTmplComponent,
    MeetingActionEditTmplComponent,
    MeetingActionEditPopupTmplComponent
  ]
})
export class SharedModule { }
