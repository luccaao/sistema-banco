import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FazerTransacaoComponent } from './fazer-transacao.component';

describe('FazerTransacaoComponent', () => {
  let component: FazerTransacaoComponent;
  let fixture: ComponentFixture<FazerTransacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FazerTransacaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FazerTransacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
