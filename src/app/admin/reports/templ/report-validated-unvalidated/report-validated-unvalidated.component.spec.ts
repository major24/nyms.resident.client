import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportValidatedUnvalidatedComponent } from './report-validated-unvalidated.component';

describe('ReportValidatedUnvalidatedComponent', () => {
  let component: ReportValidatedUnvalidatedComponent;
  let fixture: ComponentFixture<ReportValidatedUnvalidatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportValidatedUnvalidatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportValidatedUnvalidatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
