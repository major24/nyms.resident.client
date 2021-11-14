import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MeetingActionItem } from '../../../models/meeting-action-item';

@Component({
  selector: 'meeting-action-edit-popup-tmpl',
  templateUrl: './meeting-action-edit-popup-tmpl.component.html',
  styleUrls: ['./meeting-action-edit-popup-tmpl.component.css']
})
export class MeetingActionEditPopupTmplComponent implements OnInit {
  @Input()  selectedOrNewActionItem: MeetingActionItem = { id: 0, meetingCategoryId: 0, name: '', description: '', isAdhoc: false};
  @Input() saving: boolean = false;
  @Output() selectedOrNewActionItemUpdatedEvent = new EventEmitter<any>();
  error: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  updateActionItem(): void {
    this.error = '';
    if (!this.selectedOrNewActionItem.name) {
      this.error = 'Action name required';
      return;
    }
    this.selectedOrNewActionItemUpdatedEvent.emit(this.selectedOrNewActionItem);
  }

}
