import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsPendingListComponent } from './actions-pending-list.component';

describe('ActionsPendingListComponent', () => {
  let component: ActionsPendingListComponent;
  let fixture: ComponentFixture<ActionsPendingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsPendingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsPendingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
