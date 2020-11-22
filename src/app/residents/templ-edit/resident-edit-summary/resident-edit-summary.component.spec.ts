import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentEditSummaryComponent } from './resident-edit-summary.component';

describe('ResidentEditSummaryComponent', () => {
  let component: ResidentEditSummaryComponent;
  let fixture: ComponentFixture<ResidentEditSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidentEditSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentEditSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
