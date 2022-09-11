import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BipIconComponent } from './bip-icon.component';

describe('BipIconComponent', () => {
  let component: BipIconComponent;
  let fixture: ComponentFixture<BipIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BipIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BipIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
