import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioReceitaCategoriaComponent } from './relatorio-receita-categoria.component';

describe('RelatorioReceitaCategoriaComponent', () => {
  let component: RelatorioReceitaCategoriaComponent;
  let fixture: ComponentFixture<RelatorioReceitaCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioReceitaCategoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioReceitaCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
