import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeStaffComponent } from './home-staff.component';

describe('HomeStaffComponent (minimal)', () => {
  it('should create', () => {
    TestBed.configureTestingModule({imports: [HomeStaffComponent]});
    const fixture = TestBed.createComponent(HomeStaffComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });
});
