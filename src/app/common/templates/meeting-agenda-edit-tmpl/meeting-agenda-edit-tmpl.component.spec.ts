import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingAgendaEditTmplComponent } from './meeting-agenda-edit-tmpl.component';

describe('MeetingAgendaEditTmplComponent', () => {
  let component: MeetingAgendaEditTmplComponent;
  let fixture: ComponentFixture<MeetingAgendaEditTmplComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingAgendaEditTmplComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingAgendaEditTmplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
