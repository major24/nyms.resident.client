import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { MeetingActionRequest } from '../../../models/meeting-action-request';

@Component({
  selector: 'meeting-action-edit-tmpl',
  templateUrl: './meeting-action-edit-tmpl.component.html',
  styleUrls: ['./meeting-action-edit-tmpl.component.css']
})
export class MeetingActionEditTmplComponent implements OnInit {
  // MEETING ACTION
  @Input() meetingActionRequests: MeetingActionRequest[] = [];
  @Input() selectedCategoryId: number = 0;
  @Input() actionOwners: any = [];
  priorities = ['High', 'Medium', 'Low'];
  frequency = ['Weekly', 'Fortnight', 'Monthly'];
  repetition = [1,2,3,4,5,6,7,8,9,10]

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

}
