import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaCatergoriaComponent } from './nova-catergoria.component';

describe('NovaCatergoriaComponent', () => {
  let component: NovaCatergoriaComponent;
  let fixture: ComponentFixture<NovaCatergoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovaCatergoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovaCatergoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
