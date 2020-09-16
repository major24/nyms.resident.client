import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingDateSelectionComponent } from './billing-date-selection.component';

describe('BillingDateSelectionComponent', () => {
  let component: BillingDateSelectionComponent;
  let fixture: ComponentFixture<BillingDateSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingDateSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingDateSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
