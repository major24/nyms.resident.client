import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mdatev2Component } from './mdatev2.component';

describe('Mdatev2Component', () => {
  let component: Mdatev2Component;
  let fixture: ComponentFixture<Mdatev2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mdatev2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mdatev2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
