import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialWorkerDetailEditComponent } from './social-worker-detail-edit.component';

describe('SocialWorkerDetailEditComponent', () => {
  let component: SocialWorkerDetailEditComponent;
  let fixture: ComponentFixture<SocialWorkerDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialWorkerDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialWorkerDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
