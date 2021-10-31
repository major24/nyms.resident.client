import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { MeetingActionItem } from '../../../models/meeting-action-item';

@Component({
  selector: 'meeting-action-item-edit-tmpl',
  templateUrl: './meeting-action-item-edit-tmpl.component.html',
  styleUrls: ['./meeting-action-item-edit-tmpl.component.css']
})
export class MeetingActionItemEditTmplComponent implements OnInit {
  @Input() meetingActionItemsInput: MeetingActionItem[];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  removeActionItemFromArray(idx: number): void {
    this.meetingActionItemsInput.splice(idx, 1);
  }
}
