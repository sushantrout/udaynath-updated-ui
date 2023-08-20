import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityResultComponent } from './university-result.component';

describe('UniversityResultComponent', () => {
  let component: UniversityResultComponent;
  let fixture: ComponentFixture<UniversityResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniversityResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
