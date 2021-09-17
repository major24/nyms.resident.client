import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { MeetingCategory, MeetingActionItem, Meeting } from '../../app/models/index';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(private apiService: ApiService) { }

  loadMeetingCategories(): Observable<MeetingCategory[]> {
    return this.apiService.loadMeetingCategories();
  }

  loadMeetingCategoriesAndActionItems(): Observable<MeetingCategory[]> {
    return this.apiService.loadMeetingCategoriesAndActionItems();
  }

  createMeetingCategory(meetingCategory: MeetingCategory): Observable<MeetingCategory> {
    return this.apiService.createMeetingCategory(meetingCategory);
  }

  updateMeetingCategory(meetingCategory: MeetingCategory): Observable<MeetingCategory> {
    return this.apiService.updateMeetingCategory(meetingCategory);
  }

  createMeetingActionItem(meetingActionItem: MeetingActionItem): Observable<MeetingActionItem> {
    return this.apiService.createMeetingActionItem(meetingActionItem);
  }

  updateMeetingActionItems(meetingActionItem: MeetingActionItem): Observable<MeetingActionItem> {
    return this.apiService.updateMeetingAgenda(meetingActionItem);
  }

  loadMeetings(): Observable<Meeting[]> {
    return this.apiService.loadMeetings();
  }

  loadMeeting(referenceId: string): Observable<Meeting> {
    return this.apiService.loadMeeting(referenceId);
  }

  createMeeting(meeting: Meeting): Observable<Meeting> {
    return this.apiService.createMeeting(meeting);
  }

  updateMeeting(meeting: Meeting): Observable<Meeting> {
    return this.apiService.updateMeeting(meeting);
  }

}
