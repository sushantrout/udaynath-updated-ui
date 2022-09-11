import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BipInputNumberComponent } from './bip-input-number.component';

describe('BipInputNumberComponent', () => {
  let component: BipInputNumberComponent;
  let fixture: ComponentFixture<BipInputNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BipInputNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BipInputNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
