import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsAuditListComponent } from './actions-audit-list.component';

describe('ActionsAuditListComponent', () => {
  let component: ActionsAuditListComponent;
  let fixture: ComponentFixture<ActionsAuditListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsAuditListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsAuditListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
