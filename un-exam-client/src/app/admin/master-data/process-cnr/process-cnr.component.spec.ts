import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessCnrComponent } from './process-cnr.component';

describe('ProcessCnrComponent', () => {
  let component: ProcessCnrComponent;
  let fixture: ComponentFixture<ProcessCnrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessCnrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessCnrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
