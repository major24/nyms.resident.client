import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportByDateRangeComponent } from './report-by-date-range.component';

describe('ReportByDateRangeComponent', () => {
  let component: ReportByDateRangeComponent;
  let fixture: ComponentFixture<ReportByDateRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportByDateRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportByDateRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
