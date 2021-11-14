import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MeetingActionCompletedResponse, CareHomeUser } from '../../../../../src/app/models/index';
import { MeetingService } from '../../../../app/services/meeting.service';
import { UserService } from '../../../../app/services/user.service';

interface ActionRequest {
  id: number,
  name: string,
  audited: string,
  comment: string
}

@Component({
  selector: 'actions-audit-list',
  templateUrl: './actions-audit-list.component.html',
  styleUrls: ['./actions-audit-list.component.css']
})
export class ActionsAuditListComponent implements OnInit {
   // -1 = ALL USERS in querying db
  loading: boolean = false;
  saving: boolean = false;
  error: string = '';
  closeResult = '';
  ROLE_ID_MEETING_ACTION_OWNERS: number = 5; // 5 = Action Owners Role

  meetingActionCompletedResponse: MeetingActionCompletedResponse[] = [];
  actions: MeetingActionCompletedResponse[] = [];
  selectedActionId: number = 0;
  selectedAction: ActionRequest = { id: 0, name: '', audited: '', comment: '' };

  selectedOwnerId: number = 0;
  actionOwners: CareHomeUser[] = [];
  distinctMeetingCategories: string[] = [];
  user: CareHomeUser = { userId: 0, referenceId: '', foreName:'', surName:'', careHomeRoles:[]};

  @ViewChild('contentAdd') tempRef: TemplateRef<any>;

  constructor(private meetingService: MeetingService,
    private userService: UserService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadUsersByRoleId(this.ROLE_ID_MEETING_ACTION_OWNERS);
    this.loadCompletedActions();
  }

  loadCompletedActions(): void {
    this.loading = true;
    this.meetingActionCompletedResponse = [];
    this.actions = [];
    this.meetingService.loadCompletedActions()
      .subscribe({
        next: (data) => {
          Object.assign(this.meetingActionCompletedResponse, data);
          Object.assign(this.actions, data); // to display in ui along with filtering
          console.log('loaded completed actions:', this.meetingActionCompletedResponse);

          this.createMeetingCategories();
          this.loading = false;
        },
        error: (error) => {
          console.log('Error fetching completed actions ', error);
          this.loading = false;
        }
      });
  }

  // go(): void {
  //   if (+this.selectedOwnerId > 0) {
  //     const refId = this.actionOwners.find(usr => usr.userId === +this.selectedOwnerId).referenceId;
  //     this.loadPendingActionsByOwnerId(refId);
  //   } else if (+this.selectedOwnerId === -1) {
  //     this.loadPendingActions();
  //   }
  // }

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
      this.actions = Object.assign(this.actions, this.meetingActionCompletedResponse);
    } else {
      this.actions = this.meetingActionCompletedResponse.filter(a => a.categoryName === selCategory);
    }
  }

  actionAudited(event: any): void {
    const name = this.actions.filter(a => a.id === event)[0].name;
    this.selectedAction = Object.assign({}, { id: event, name: name, audited: '', comment: ''});
    this.selectedActionId = event;
    this.modalService.open(this.tempRef);
  }

  updateAuditedAction(): void {
    if (this.selectedAction.id === 0) {
      this.error = 'Id required. system error.';
      return;
    }
    if (this.selectedAction.audited === '') {
      this.error = 'Audited status is required.';
      return;
    }
    console.log('rdy to update audited status', this.selectedAction);

    this.saving = true;
    this.meetingService.updateActionAudited(this.selectedAction)
    .subscribe({
      next: (data) => {
        console.log('>>', data);
        this.saving = false;
        this.removeActionFromList(this.selectedAction.id);
        this.modalService.dismissAll();
      },
      error: (error) => {
        console.log('Error updating completed action ', error);
        this.saving = false;
      }
    });
  }

  removeActionFromList(id: number): void {
    this.actions = this.actions.filter(a => a.id !== id);
    this.meetingActionCompletedResponse = this.meetingActionCompletedResponse.filter(a => a.id !== id);
  }






}
