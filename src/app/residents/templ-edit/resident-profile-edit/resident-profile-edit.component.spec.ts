import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentProfileEditComponent } from './resident-profile-edit.component';

describe('ResidentProfileEditComponent', () => {
  let component: ResidentProfileEditComponent;
  let fixture: ComponentFixture<ResidentProfileEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidentProfileEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
