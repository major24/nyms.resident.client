import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareTypeEditComponent } from './care-type-edit.component';

describe('CareTypeEditComponent', () => {
  let component: CareTypeEditComponent;
  let fixture: ComponentFixture<CareTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
