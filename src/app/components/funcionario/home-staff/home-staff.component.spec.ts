import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeStaffComponent } from './home-staff.component';

describe('HomeStaffComponent', () => {
  let component: HomeStaffComponent;
  let fixture: ComponentFixture<HomeStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeStaffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
