import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManterCategoriaComponent } from './manter-categoria.component';

describe('ManterCategoriaComponent', () => {
  let component: ManterCategoriaComponent;
  let fixture: ComponentFixture<ManterCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManterCategoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManterCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
