import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBudgetsListComponent } from './user-budgets-list.component';

describe('UserBudgetsListComponent', () => {
  let component: UserBudgetsListComponent;
  let fixture: ComponentFixture<UserBudgetsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBudgetsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBudgetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
