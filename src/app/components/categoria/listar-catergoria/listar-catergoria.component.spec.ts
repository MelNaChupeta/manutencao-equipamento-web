import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCatergoriaComponent } from './listar-catergoria.component';

describe('ListarCatergoriaComponent', () => {
  let component: ListarCatergoriaComponent;
  let fixture: ComponentFixture<ListarCatergoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarCatergoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarCatergoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
