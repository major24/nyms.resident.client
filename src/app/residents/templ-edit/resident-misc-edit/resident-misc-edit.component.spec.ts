import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentMiscEditComponent } from './resident-misc-edit.component';

describe('ResidentMiscEditComponent', () => {
  let component: ResidentMiscEditComponent;
  let fixture: ComponentFixture<ResidentMiscEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidentMiscEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentMiscEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
