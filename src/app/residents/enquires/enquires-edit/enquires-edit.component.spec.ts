import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiresEditComponent } from './enquires-edit.component';

describe('EnquiresEditComponent', () => {
  let component: EnquiresEditComponent;
  let fixture: ComponentFixture<EnquiresEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquiresEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquiresEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
