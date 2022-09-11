import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BipDropdownComponent } from './bip-dropdown.component';

describe('BipDropdownComponent', () => {
  let component: BipDropdownComponent;
  let fixture: ComponentFixture<BipDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BipDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BipDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
