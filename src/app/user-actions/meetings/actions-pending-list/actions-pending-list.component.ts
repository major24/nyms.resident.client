import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MeetingActionPendingJobsResponse, CareHomeUser } from '../../../../../src/app/models/index';
import { MeetingService } from '../../../../app/services/meeting.service';
import { UserService } from '../../../../app/services/user.service';

interface ActionRequest {
  id: number,
  name: string,
  completed: string,
  comment: string
}

@Component({
  selector: 'actions-pending-list',
  templateUrl: './actions-pending-list.component.html',
  styleUrls: ['./actions-pending-list.component.css']
})
export class ActionsPendingListComponent implements OnInit {
    // -1 = ALL USERS in querying db
  ROLE_ID_MEETING_ACTION_OWNERS: number = 5; // Action owners role id
  loading: boolean = false;
  saving: boolean = false;
  error: string = '';
  closeResult = '';

  meetingActionPendingJobsResponses: MeetingActionPendingJobsResponse[] = [];
  actions: MeetingActionPendingJobsResponse[] = [];
  selectedActionId: number = 0;
  selectedAction: ActionRequest = { id: 0, name: '', completed: '', comment: '' };

  selectedOwnerId: number = 0;
  actionOwners: CareHomeUser[] = [];
  distinctMeetingCategories: string[] = [];

  user: CareHomeUser = { userId: 0, referenceId: '', foreName:'', surName:'', careHomeRoles:[]};

  @ViewChild('contentAdd') tempRef: TemplateRef<any>;

  constructor(private meetingService: MeetingService,
    private userService: UserService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.userService.reloadUser().subscribe(u =>{
      this.loadPendingActionsByOwnerId(u.referenceId);
      this.loadUsersByRoleId(this.ROLE_ID_MEETING_ACTION_OWNERS);
    });
  }

  loadPendingActionsByOwnerId(userRefId: string): void {
    this.loading = true;
    this.meetingActionPendingJobsResponses = [];
    this.actions = [];
    this.meetingService.loadPendingActionsByOwnerId(userRefId)
      .subscribe({
        next: (data) => {
          Object.assign(this.meetingActionPendingJobsResponses, data);
          Object.assign(this.actions, data); // to display in ui along with filtering
          console.log('loaded pending actions:', this.meetingActionPendingJobsResponses);
          this.createMeetingCategories();
          this.loading = false;
        },
        error: (error) => {
          console.log('Error fetching pending actions ', error);
          this.loading = false;
        }
      });
  }

  // GET ALL Owners actions
  loadPendingActions(): void {
    this.loading = true;
    this.meetingActionPendingJobsResponses = [];
    this.actions = [];
    this.meetingService.loadPendingActions()
      .subscribe({
        next: (data) => {
          Object.assign(this.meetingActionPendingJobsResponses, data);
          Object.assign(this.actions, data); // to display in ui along with filtering
          console.log('loaded pending actions:', this.meetingActionPendingJobsResponses);
          this.createMeetingCategories();
          this.loading = false;
        },
        error: (error) => {
          console.log('Error fetching pending actions ', error);
          this.loading = false;
        }
      });
  }

  go(): void {
    if (+this.selectedOwnerId > 0) {
      const refId = this.actionOwners.find(usr => usr.userId === +this.selectedOwnerId).referenceId;
      this.loadPendingActionsByOwnerId(refId);
    } else if (+this.selectedOwnerId === -1) {
      this.loadPendingActions();
    }
  }

  loadUsersByRoleId(roleId: number): void {
    this.actionOwners = [];
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

  createMeetingCategories(): void {
    this.distinctMeetingCategories = [];
    if (this.actions.length > 0) {
      const categories = this.actions.map(a => {
        return a.categoryName;
      });
      this.distinctMeetingCategories = [...new Set(categories)];
    }
  }

  onCategoryChange(event: any): void {
    const selCategory = event.target.value;
    if (selCategory === 'All') {
      this.actions = Object.assign(this.actions, this.meetingActionPendingJobsResponses);
    } else {
      this.actions = this.meetingActionPendingJobsResponses.filter(a => a.categoryName === selCategory);
    }
  }

  actionCompleted(event: any): void {
    const name = this.actions.filter(a => a.id === event)[0].name;
    this.selectedAction = Object.assign({}, { id: event, name: name, completed: 'Yes', comment: ''});
    this.selectedActionId = event;
    this.modalService.open(this.tempRef);
  }

  updateCompletedAction(): void {
    if (this.selectedAction.id === 0) {
      this.error = 'Id required. system error.';
      return;
    }
    if (this.selectedAction.completed === '') {
      this.error = 'Completed status is required.';
      return;
    }
    if (this.selectedAction.completed === 'No' && this.selectedAction.comment === '') {
      this.error = 'Comment is required.';
      return;
    }
    console.log('rdy to update completed status', this.selectedAction);

    this.saving = true;
    this.meetingService.updateActionCompleted(this.selectedAction)
    .subscribe({
      next: (data) => {
        console.log('>>', data);
        this.saving = false;
        this.removeCompletedActionFromList(this.selectedAction.id);
        this.modalService.dismissAll();
      },
      error: (error) => {
        console.log('Error updating completed action ', error);
        this.saving = false;
      }
    });
  }

  removeCompletedActionFromList(id: number): void {
    this.actions = this.actions.filter(a => a.id !== id);
    this.meetingActionPendingJobsResponses = this.meetingActionPendingJobsResponses.filter(a => a.id !== id);
  }


}
