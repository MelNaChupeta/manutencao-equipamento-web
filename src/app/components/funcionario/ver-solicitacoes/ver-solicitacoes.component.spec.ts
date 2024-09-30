import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerSolicitacoesComponent } from './ver-solicitacoes.component';

describe('VerSolicitacoesComponent', () => {
  let component: VerSolicitacoesComponent;
  let fixture: ComponentFixture<VerSolicitacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerSolicitacoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerSolicitacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
