import { ValueAccessor } from './../bip-shared/bip-value-accessor';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BipButtonComponent } from './bip-button.component';


describe('BipButtonComponent', () => {
  let component: BipButtonComponent;
  let fixture: ComponentFixture<BipButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BipButtonComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BipButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
