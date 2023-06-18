import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackFormFillupComponent } from './back-form-fillup.component';

describe('BackFormFillupComponent', () => {
  let component: BackFormFillupComponent;
  let fixture: ComponentFixture<BackFormFillupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackFormFillupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackFormFillupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
