import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardResidentsComponent } from './dashboard-residents.component';

describe('DashboardResidentsComponent', () => {
  let component: DashboardResidentsComponent;
  let fixture: ComponentFixture<DashboardResidentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardResidentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardResidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
