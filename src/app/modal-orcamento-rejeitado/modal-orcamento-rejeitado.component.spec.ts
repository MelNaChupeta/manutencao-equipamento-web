import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOrcamentoRejeitadoComponent } from './modal-orcamento-rejeitado.component';

describe('ModalOrcamentoRejeitadoComponent', () => {
  let component: ModalOrcamentoRejeitadoComponent;
  let fixture: ComponentFixture<ModalOrcamentoRejeitadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalOrcamentoRejeitadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalOrcamentoRejeitadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
