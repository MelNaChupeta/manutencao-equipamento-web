import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOrcamentoAprovadoComponent } from './modal-orcamento-aprovado.component';

describe('ModalOrcamentoAprovadoComponent', () => {
  let component: ModalOrcamentoAprovadoComponent;
  let fixture: ComponentFixture<ModalOrcamentoAprovadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalOrcamentoAprovadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalOrcamentoAprovadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
