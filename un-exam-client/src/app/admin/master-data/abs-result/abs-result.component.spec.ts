import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsResultComponent } from './abs-result.component';

describe('AbsResultComponent', () => {
  let component: AbsResultComponent;
  let fixture: ComponentFixture<AbsResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
