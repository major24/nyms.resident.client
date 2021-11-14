import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionViewTmplComponent } from './action-view-tmpl.component';

describe('ActionViewTmplComponent', () => {
  let component: ActionViewTmplComponent;
  let fixture: ComponentFixture<ActionViewTmplComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionViewTmplComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionViewTmplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
