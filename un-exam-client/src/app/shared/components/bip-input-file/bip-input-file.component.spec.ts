import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BipInputFileComponent } from './bip-input-file.component';

describe('BipInputFileComponent', () => {
  let component: BipInputFileComponent;
  let fixture: ComponentFixture<BipInputFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BipInputFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BipInputFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
