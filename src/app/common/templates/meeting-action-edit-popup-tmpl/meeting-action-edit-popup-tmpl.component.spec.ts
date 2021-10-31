import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingActionEditPopupTmplComponent } from './meeting-action-edit-popup-tmpl.component';

describe('MeetingActionEditPopupTmplComponent', () => {
  let component: MeetingActionEditPopupTmplComponent;
  let fixture: ComponentFixture<MeetingActionEditPopupTmplComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingActionEditPopupTmplComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingActionEditPopupTmplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
