import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryMiscEditComponent } from './enquiry-misc-edit.component';

describe('EnquiryMiscEditComponent', () => {
  let component: EnquiryMiscEditComponent;
  let fixture: ComponentFixture<EnquiryMiscEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquiryMiscEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquiryMiscEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
