import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingCategoryListComponent } from './meeting-category-list.component';

describe('MeetingCategoryListComponent', () => {
  let component: MeetingCategoryListComponent;
  let fixture: ComponentFixture<MeetingCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
