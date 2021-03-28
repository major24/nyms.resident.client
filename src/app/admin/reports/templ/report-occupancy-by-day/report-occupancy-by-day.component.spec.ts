import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOccupancyByDayComponent } from './report-occupancy-by-day.component';

describe('ReportOccupancyByDayComponent', () => {
  let component: ReportOccupancyByDayComponent;
  let fixture: ComponentFixture<ReportOccupancyByDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportOccupancyByDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOccupancyByDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
