import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MeetingActionCompletedResponse } from '../../../models/meeting-action-completed-response';


@Component({
  selector: 'action-view-audit-tmpl',
  templateUrl: './action-view-audit-tmpl.component.html',
  styleUrls: ['./action-view-audit-tmpl.component.css']
})
export class ActionViewAuditTmplComponent implements OnInit {
  @Input() meetingAction: MeetingActionCompletedResponse = { id: 0, name: '', description: '', ownerId: 0, completionDate: '', priority: '', categoryName: '', forename: '', completed: '', completedById: 0, completedByName: '', completedDate: '', comment: '' };
  @Output() actionAuditedEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  showActionAuditedDialog(event: any): void {
    this.actionAuditedEvent.emit(event);
  }

}
