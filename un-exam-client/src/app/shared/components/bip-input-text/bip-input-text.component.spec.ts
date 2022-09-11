import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BipInputTextComponent } from './bip-input-text.component';

describe('BipInputTextComponent', () => {
  let component: BipInputTextComponent;
  let fixture: ComponentFixture<BipInputTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BipInputTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BipInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
