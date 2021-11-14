import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MeetingActionPendingJobsResponse } from '../../../models/meeting-action-pending-jobs-response';

@Component({
  selector: 'action-view-tmpl',
  templateUrl: './action-view-tmpl.component.html',
  styleUrls: ['./action-view-tmpl.component.css']
})
export class ActionViewTmplComponent implements OnInit {
  @Input() meetingAction: MeetingActionPendingJobsResponse = { id: 0, name: '', description: '', ownerId: 0, completionDate: '', priority: '', categoryName: '', forename: '', title: '' };
  @Output() actionCompletedEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  showActionCompleteDialog(event: any): void {
    this.actionCompletedEvent.emit(event);
  }

}
