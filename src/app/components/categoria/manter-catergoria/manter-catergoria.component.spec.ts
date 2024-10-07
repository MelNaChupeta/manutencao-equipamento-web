import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManterCatergoriaComponent } from './manter-catergoria.component';

describe('ManterCatergoriaComponent', () => {
  let component: ManterCatergoriaComponent;
  let fixture: ComponentFixture<ManterCatergoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManterCatergoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManterCatergoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
