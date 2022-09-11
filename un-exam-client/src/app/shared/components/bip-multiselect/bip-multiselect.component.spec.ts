import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BipMultiselectComponent } from './bip-multiselect.component';

describe('BipMultiselectComponent', () => {
  let component: BipMultiselectComponent;
  let fixture: ComponentFixture<BipMultiselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BipMultiselectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BipMultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
