import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUserActionsComponent } from './dashboard-user-actions.component';

describe('DashboardUserActionsComponent', () => {
  let component: DashboardUserActionsComponent;
  let fixture: ComponentFixture<DashboardUserActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardUserActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardUserActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
