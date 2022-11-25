import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultPdfPgComponent } from './result-pdf-pg.component';

describe('ResultPdfPgComponent', () => {
  let component: ResultPdfPgComponent;
  let fixture: ComponentFixture<ResultPdfPgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultPdfPgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultPdfPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
