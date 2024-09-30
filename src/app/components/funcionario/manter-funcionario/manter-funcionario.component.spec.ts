import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManterFuncionarioComponent } from './manter-funcionario.component';

describe('ManterFuncionarioComponent', () => {
  let component: ManterFuncionarioComponent;
  let fixture: ComponentFixture<ManterFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManterFuncionarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManterFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
