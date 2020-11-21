import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStatisticsApexComponent } from './profile-statistics-apex.component';

describe('ProfileStatisticsApexComponent', () => {
  let component: ProfileStatisticsApexComponent;
  let fixture: ComponentFixture<ProfileStatisticsApexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileStatisticsApexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileStatisticsApexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
