import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BipTextAreaComponent } from './bip-text-area.component';

describe('BipTextAreaComponent', () => {
  let component: BipTextAreaComponent;
  let fixture: ComponentFixture<BipTextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BipTextAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BipTextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
