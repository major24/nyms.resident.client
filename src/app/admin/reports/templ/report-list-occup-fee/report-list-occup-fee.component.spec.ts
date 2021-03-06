import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportListOccupFeeComponent } from './report-list-occup-fee.component';

describe('ReportListOccupFeeComponent', () => {
  let component: ReportListOccupFeeComponent;
  let fixture: ComponentFixture<ReportListOccupFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportListOccupFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportListOccupFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
