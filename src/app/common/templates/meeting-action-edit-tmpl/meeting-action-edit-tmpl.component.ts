import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MeetingActionRequest } from '../../../models/meeting-action-request';

@Component({
  selector: 'meeting-action-edit-tmpl',
  templateUrl: './meeting-action-edit-tmpl.component.html',
  styleUrls: ['./meeting-action-edit-tmpl.component.css']
})
export class MeetingActionEditTmplComponent implements OnInit {
  @Input() meetingActionRequests: MeetingActionRequest[] = [];
  @Input() actionOwners: any = [];
  @Input() showFrequencyCtls: boolean = false;
  @Input() showActionSelectCheckboxCtl: boolean = false;
  @Input() showSaveButtonCtl: boolean = false;
  @Output() updatedActionEvent = new EventEmitter<any>();

  priorities = ['High', 'Medium', 'Low'];
  frequency = ['Weekly', 'Fortnight', 'Monthly'];
  repetition = [1,2,3,4,5,6,7,8,9,10]

  constructor() { }

  ngOnInit(): void {
  }

  updateAction(actionId: number): void {
    this.updatedActionEvent.emit(actionId);
  }

}
