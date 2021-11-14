import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MeetingActionRequest, Meeting, CareHomeUser } from '../../../../../src/app/models/index';
import { MeetingService } from '../../../../app/services/meeting.service';
import { UserService } from '../../../../app/services/user.service';
import { Util } from '../../../helpers/';

@Component({
  selector: 'meetings-edit',
  templateUrl: './meetings-edit.component.html',
  styleUrls: ['./meetings-edit.component.css']
})
export class MeetingsEditComponent implements OnInit {
  loading: boolean = false;
  errors: string[] = [];
  saving: boolean = false;
  routePath: string = '';
  ROLE_ID_MEETING_ACTION_OWNERS: number = 5; // 5 = Action Owners Role
  actionOwners: CareHomeUser[] = [];
  todayDate: any = new Date();
  referenceId: string = '';
  newMeeting: Meeting = { id: 0, referenceId: '', title: '', meetingDate: '', ownerId: 0, status: '', meetingActions: [] }

  constructor(
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private meetingService: MeetingService,
    private userService: UserService,
    private readonly util: Util) { }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe((params) => {
      if (params && params.get('referenceId')) {
        this.referenceId = params.get('referenceId');
        this.loadUsersByRoleId(this.ROLE_ID_MEETING_ACTION_OWNERS);
        setTimeout(() => {
          this.loadMeeting(this.referenceId);
        }, 5); // Give little time to load Owners
      }
    });
  }

  loadUsersByRoleId(roleId: number): void {
    this.loading = true;
    this.userService.loadUsersByRoleId(roleId)
      .subscribe({
        next: (data) => {
          Object.assign(this.actionOwners, data);
          console.log('loaded users (action owners):', this.actionOwners);
          this.loading = false;
        },
        error: (error) => {
          console.log('Error fetching meeting by refid ', error);
          this.loading = false;
        }
    });
  }

  loadMeeting(referenceId: string): void {
    this.loading = true;
    this.meetingService.loadMeeting(referenceId)
      .subscribe({
        next: (data) => {
          Object.assign(this.newMeeting, data);
          console.log('loaded meeting and actions:', this.newMeeting);
          // Update meetingDate to fit angular format
          this.newMeeting.meetingActions.map(act => {
            act.startDate = this.util.convertIsoDateStringToAngDate(this.util.getIsoDateString(act.startDate));
            act.completionDate = this.util.convertIsoDateStringToAngDate(this.util.getIsoDateString(act.completionDate));
          });
          console.log('>>>>', this.newMeeting);
          this.loading = false;
        },
        error: (error) => {
          console.log('Error fetching meeting by refid ', error);
          this.loading = false;
        }
      });
  }

  updatedAction(eventData: any): void {
    var actionRequest = this.newMeeting.meetingActions.filter(act => act.id === +eventData)[0];
    let meetingActionReqToBeSend = Object.assign({}, actionRequest);

    meetingActionReqToBeSend.startDate = this.util.convertAngDateToString(meetingActionReqToBeSend.startDate);
    meetingActionReqToBeSend.completionDate = this.util.convertAngDateToString(meetingActionReqToBeSend.completionDate);

    if (!this.validateMeetingActionRequest(meetingActionReqToBeSend)) {
      return;
    }
    console.log('rdy to update');

    this.saving = true;
    this.meetingService.updateMeetingAction(meetingActionReqToBeSend)
      .subscribe({
        next: (response) => {
          this.saving = false;
          console.log('Data saved');
          this._router.navigate(['/user/meetings-list', {}]);
        },
        error: (error) => {
          console.log('Error saving data');
          this.saving = false;
        },
    });

  }

  onCancel(): void {
    this._router.navigate(['/user/meetings-list', {}]);
  }

  validateMeetingActionRequest(actionRequest: MeetingActionRequest): boolean {
    this.errors = [];

    // ensure completion date is included
    if (!actionRequest.completionDate) {
      this.errors.push('Completion date is required');
    }

    // if completion date added, then ensure the date is later than start date.
    let stDate = (actionRequest.startDate != '') ? new Date(actionRequest.startDate) : '';
    let compDate = (actionRequest.completionDate != '') ? new Date(actionRequest.completionDate) : '';
    if (stDate && compDate) {
      if (compDate < stDate) {
        this.errors.push(`Incorrect dates selected for "${actionRequest.name}"`);
      }
    }

    if (+actionRequest.ownerId <= 0) {
      this.errors.push('Owner is required');
    }

    return this.errors.length === 0 ? true : false;
  }

}


