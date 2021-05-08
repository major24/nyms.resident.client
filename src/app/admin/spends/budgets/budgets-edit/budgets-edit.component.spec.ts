import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetsEditComponent } from './budgets-edit.component';

describe('BudgetsEditComponent', () => {
  let component: BudgetsEditComponent;
  let fixture: ComponentFixture<BudgetsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
