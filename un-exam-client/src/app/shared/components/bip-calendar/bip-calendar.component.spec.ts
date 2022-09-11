import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BipCalendarComponent } from './bip-calendar.component';

describe('BipCalendarComponent', () => {
  let component: BipCalendarComponent;
  let fixture: ComponentFixture<BipCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BipCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BipCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
