import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaturapdfComponent } from './faturapdf.component';

describe('FaturapdfComponent', () => {
  let component: FaturapdfComponent;
  let fixture: ComponentFixture<FaturapdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaturapdfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FaturapdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
