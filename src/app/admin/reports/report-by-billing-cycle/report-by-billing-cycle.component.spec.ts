import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportByBillingCycleComponent } from './report-by-billing-cycle.component';

describe('ReportByBillingCycleComponent', () => {
  let component: ReportByBillingCycleComponent;
  let fixture: ComponentFixture<ReportByBillingCycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportByBillingCycleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportByBillingCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
