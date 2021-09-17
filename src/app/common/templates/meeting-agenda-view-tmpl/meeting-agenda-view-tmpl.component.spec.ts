import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingAgendaViewTmplComponent } from './meeting-agenda-view-tmpl.component';

describe('MeetingAgendaViewTmplComponent', () => {
  let component: MeetingAgendaViewTmplComponent;
  let fixture: ComponentFixture<MeetingAgendaViewTmplComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingAgendaViewTmplComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingAgendaViewTmplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
