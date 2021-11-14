import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionViewAuditTmplComponent } from './action-view-audit-tmpl.component';

describe('ActionViewAuditTmplComponent', () => {
  let component: ActionViewAuditTmplComponent;
  let fixture: ComponentFixture<ActionViewAuditTmplComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionViewAuditTmplComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionViewAuditTmplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
