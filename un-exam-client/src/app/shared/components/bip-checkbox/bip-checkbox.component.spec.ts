import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BipCheckboxComponent } from './bip-checkbox.component';

describe('BipCheckboxComponent', () => {
  let component: BipCheckboxComponent;
  let fixture: ComponentFixture<BipCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BipCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BipCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
