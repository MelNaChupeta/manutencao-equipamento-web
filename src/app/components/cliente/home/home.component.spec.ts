import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent (with beforeEach)', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HomeComponent] });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should render title', () => {
    const homeElement: HTMLElement = fixture.nativeElement;
    const title = homeElement.querySelector('h2')!;
    expect(title.textContent).toEqual('Minhas solicitações');
  });
});
