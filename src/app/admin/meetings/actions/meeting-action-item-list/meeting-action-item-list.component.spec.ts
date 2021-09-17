import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingActionItemListComponent } from './meeting-action-item-list.component';

describe('MeetingActionItemListComponent', () => {
  let component: MeetingActionItemListComponent;
  let fixture: ComponentFixture<MeetingActionItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingActionItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingActionItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
