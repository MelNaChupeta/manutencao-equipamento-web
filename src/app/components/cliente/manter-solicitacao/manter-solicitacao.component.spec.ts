import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ManterSolicitacaoComponent } from './manter-solicitacao.component';

describe('ManterSolicitacaoComponent', () => {
  let component: ManterSolicitacaoComponent;
  let fixture: ComponentFixture<ManterSolicitacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManterSolicitacaoComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ManterSolicitacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const homeElement: HTMLElement = fixture.nativeElement;
    const title = homeElement.querySelector('h2')!;
    expect(title.textContent).toContain('Solicitação');
  });
});
