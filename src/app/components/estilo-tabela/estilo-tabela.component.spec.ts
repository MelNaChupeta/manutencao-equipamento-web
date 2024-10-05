import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstiloTabelaComponent } from './estilo-tabela.component';

describe('EstiloTabelaComponent', () => {
  let component: EstiloTabelaComponent;
  let fixture: ComponentFixture<EstiloTabelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstiloTabelaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstiloTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
