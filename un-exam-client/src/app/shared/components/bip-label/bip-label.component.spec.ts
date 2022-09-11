import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BipLabelComponent } from './bip-label.component';

describe('BipLabelComponent', () => {
  let component: BipLabelComponent;
  let fixture: ComponentFixture<BipLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BipLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BipLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
