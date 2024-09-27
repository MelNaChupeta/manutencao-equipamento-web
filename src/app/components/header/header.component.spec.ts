import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent (minimal)', () => {
  it('should create', () => {
    TestBed.configureTestingModule({imports: [HeaderComponent]});
    const fixture = TestBed.createComponent(HeaderComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });
});
