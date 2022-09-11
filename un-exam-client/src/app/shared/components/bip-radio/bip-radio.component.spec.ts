import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BipRadioComponent } from './bip-radio.component';

describe('BipRadioComponent', () => {
  let component: BipRadioComponent;
  let fixture: ComponentFixture<BipRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BipRadioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BipRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
