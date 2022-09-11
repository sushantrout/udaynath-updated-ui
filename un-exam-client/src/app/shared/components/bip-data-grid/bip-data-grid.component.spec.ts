import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BipDataGridComponent } from './bip-data-grid.component';

describe('BipDataGridComponent', () => {
  let component: BipDataGridComponent;
  let fixture: ComponentFixture<BipDataGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BipDataGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BipDataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
