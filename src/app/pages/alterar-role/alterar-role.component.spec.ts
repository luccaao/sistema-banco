import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarRoleComponent } from './alterar-role.component';

describe('AlterarRoleComponent', () => {
  let component: AlterarRoleComponent;
  let fixture: ComponentFixture<AlterarRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlterarRoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlterarRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
