import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingActionEditTmplComponent } from './meeting-action-edit-tmpl.component';

describe('MeetingActionEditTmplComponent', () => {
  let component: MeetingActionEditTmplComponent;
  let fixture: ComponentFixture<MeetingActionEditTmplComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingActionEditTmplComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingActionEditTmplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
