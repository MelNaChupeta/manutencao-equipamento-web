import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { EfetuarOrcamentoComponent } from './efetuar-orcamento.component';

describe('EfetuarOrcamentoComponent', () => {
  let component: EfetuarOrcamentoComponent;
  let fixture: ComponentFixture<EfetuarOrcamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EfetuarOrcamentoComponent],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(EfetuarOrcamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const efetuarOrcamentoElement: HTMLElement = fixture.nativeElement;
    const title = efetuarOrcamentoElement.querySelector('h2')!;
    expect(title.textContent).toContain('Efetuar orçamento');
  });
});
