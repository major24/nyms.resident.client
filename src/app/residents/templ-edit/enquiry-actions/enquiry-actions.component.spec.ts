import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryActionsComponent } from './enquiry-actions.component';

describe('EnquiryActionsComponent', () => {
  let component: EnquiryActionsComponent;
  let fixture: ComponentFixture<EnquiryActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquiryActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquiryActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
