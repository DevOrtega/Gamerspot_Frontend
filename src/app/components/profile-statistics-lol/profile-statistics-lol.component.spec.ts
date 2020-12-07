import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStatisticsLolComponent } from './profile-statistics-lol.component';

describe('ProfileStatisticsLolComponent', () => {
  let component: ProfileStatisticsLolComponent;
  let fixture: ComponentFixture<ProfileStatisticsLolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileStatisticsLolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileStatisticsLolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
