import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFillupComponent } from './form-fillup.component';

describe('FormFillupComponent', () => {
  let component: FormFillupComponent;
  let fixture: ComponentFixture<FormFillupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFillupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFillupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
