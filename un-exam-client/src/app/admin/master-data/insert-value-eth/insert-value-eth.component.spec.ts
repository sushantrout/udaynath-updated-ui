import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertValueEthComponent } from './insert-value-eth.component';

describe('InsertValueEthComponent', () => {
  let component: InsertValueEthComponent;
  let fixture: ComponentFixture<InsertValueEthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertValueEthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertValueEthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
