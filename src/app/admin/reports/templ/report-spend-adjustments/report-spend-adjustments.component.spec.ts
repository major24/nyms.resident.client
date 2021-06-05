import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSpendAdjustmentsComponent } from './report-spend-adjustments.component';

describe('ReportSpendAdjustmentsComponent', () => {
  let component: ReportSpendAdjustmentsComponent;
  let fixture: ComponentFixture<ReportSpendAdjustmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSpendAdjustmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSpendAdjustmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
