import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MeetingActionEditTmplComponent } from '../common/templates/meeting-action-edit-tmpl/meeting-action-edit-tmpl.component';
import { MeetingActionEditPopupTmplComponent } from '../common/templates/meeting-action-edit-popup-tmpl/meeting-action-edit-popup-tmpl.component';
import { ActionViewTmplComponent } from '../common/templates/action-view-tmpl/action-view-tmpl.component';
import { ActionViewAuditTmplComponent } from '../common/templates/action-view-audit-tmpl/action-view-audit-tmpl.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  declarations:[
    MeetingActionEditTmplComponent,
    MeetingActionEditPopupTmplComponent,
    ActionViewTmplComponent,
    ActionViewAuditTmplComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    NgbModule,
    MeetingActionEditTmplComponent,
    MeetingActionEditPopupTmplComponent,
    ActionViewTmplComponent,
    ActionViewAuditTmplComponent
  ]
})
export class SharedModule { }
