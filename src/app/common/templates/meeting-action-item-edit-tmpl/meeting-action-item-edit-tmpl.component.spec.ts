import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingActionItemEditTmplComponent } from './meeting-action-item-edit-tmpl.component';

describe('MeetingActionItemEditTmplComponent', () => {
  let component: MeetingActionItemEditTmplComponent;
  let fixture: ComponentFixture<MeetingActionItemEditTmplComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingActionItemEditTmplComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingActionItemEditTmplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
