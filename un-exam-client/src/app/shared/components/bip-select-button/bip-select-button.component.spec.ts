import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BipSelectButtonComponent } from './bip-select-button.component';

describe('BipSelectButtonComponent', () => {
  let component: BipSelectButtonComponent;
  let fixture: ComponentFixture<BipSelectButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BipSelectButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BipSelectButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
