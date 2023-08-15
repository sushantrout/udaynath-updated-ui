import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSemResultComponent } from './total-sem-result.component';

describe('TotalSemResultComponent', () => {
  let component: TotalSemResultComponent;
  let fixture: ComponentFixture<TotalSemResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalSemResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalSemResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
