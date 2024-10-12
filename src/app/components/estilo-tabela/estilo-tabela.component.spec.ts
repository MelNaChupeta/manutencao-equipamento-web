import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaComponent } from './estilo-tabela.component';

describe('EstiloTabelaComponent', () => {
  let component: TabelaComponent;
  let fixture: ComponentFixture<TabelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
