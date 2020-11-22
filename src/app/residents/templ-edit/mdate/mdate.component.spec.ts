import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdateComponent } from './mdate.component';

describe('MdateComponent', () => {
  let component: MdateComponent;
  let fixture: ComponentFixture<MdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
