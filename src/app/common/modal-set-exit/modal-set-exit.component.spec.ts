import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSetExitComponent } from './modal-set-exit.component';

describe('ModalSetExitComponent', () => {
  let component: ModalSetExitComponent;
  let fixture: ComponentFixture<ModalSetExitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSetExitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSetExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
