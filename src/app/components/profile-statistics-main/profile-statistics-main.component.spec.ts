import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStatisticsMainComponent } from './profile-statistics-main.component';

describe('ProfileStatisticsMainComponent', () => {
  let component: ProfileStatisticsMainComponent;
  let fixture: ComponentFixture<ProfileStatisticsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileStatisticsMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileStatisticsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
