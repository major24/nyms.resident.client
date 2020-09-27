import { Component, OnInit } from '@angular/core';
import { ResidentSchedule } from '../../models/index';
import { ScheduleService } from '../../services/index';
// import { SplitPipe } from '../../../common/split.pipe';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {
  residentSchedules: ResidentSchedule[] = [];

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.loadSchedules();
  }

  loadSchedules(): void {
    this.scheduleService.loadSchedules()
    .subscribe({
      next: (data) => {
        console.log('>>>', data);
        Object.assign(this.residentSchedules, [...data]);
      },
      error: (error) => { console.log('Error fetching schedules ', error); }
    });
  }

}
