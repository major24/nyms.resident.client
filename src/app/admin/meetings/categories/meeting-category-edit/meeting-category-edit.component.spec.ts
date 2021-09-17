import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingCategoryEditComponent } from './meeting-category-edit.component';

describe('MeetingCategoryEditComponent', () => {
  let component: MeetingCategoryEditComponent;
  let fixture: ComponentFixture<MeetingCategoryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingCategoryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
