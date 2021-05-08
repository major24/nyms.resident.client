import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendsListComponent } from './spends-list.component';

describe('SpendsListComponent', () => {
  let component: SpendsListComponent;
  let fixture: ComponentFixture<SpendsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpendsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
