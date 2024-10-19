import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioReceitaComponent } from './relatorio-receita.component';

describe('RelatorioReceitaComponent', () => {
  let component: RelatorioReceitaComponent;
  let fixture: ComponentFixture<RelatorioReceitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioReceitaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioReceitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
