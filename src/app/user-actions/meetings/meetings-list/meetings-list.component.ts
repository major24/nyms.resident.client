import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meeting } from '../../../../app/models/index';
import { MeetingService } from '../../../services/meeting.service';

@Component({
  selector: 'meetings-list',
  templateUrl: './meetings-list.component.html',
  styleUrls: ['./meetings-list.component.css']
})
export class MeetingsListComponent implements OnInit {
  loading: boolean = false;
  meetings: Meeting[] = [];
  constructor(
    private router: Router,
    private meetingService: MeetingService) { }

  ngOnInit(): void {
    this.loadMeetings();
  }

  navigateToMeetingEdit(): void {
    this.router.navigate(['/user/meetings-edit/add', {}]);
  }

  loadMeetings(): void {
    this.loading = true;
    this.meetingService.loadMeetings()
    .subscribe({
      next: (data) => {
        Object.assign(this.meetings, [...data]);
        this.loading = false;
      },
      error: (error) => {
        console.log('Error fetching master categories ', error);
        this.loading = false;
      }
    });
  }




}
