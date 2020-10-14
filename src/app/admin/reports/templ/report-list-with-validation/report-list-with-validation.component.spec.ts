import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportListWithValidationComponent } from './report-list-with-validation.component';

describe('ReportListWithValidationComponent', () => {
  let component: ReportListWithValidationComponent;
  let fixture: ComponentFixture<ReportListWithValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportListWithValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportListWithValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
