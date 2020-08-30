import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomLocationEditComponent } from './room-location-edit.component';

describe('RoomLocationEditComponent', () => {
  let component: RoomLocationEditComponent;
  let fixture: ComponentFixture<RoomLocationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomLocationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomLocationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
