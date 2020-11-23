import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStatisticsNodataComponent } from './profile-statistics-nodata.component';

describe('ProfileStatisticsNodataComponent', () => {
  let component: ProfileStatisticsNodataComponent;
  let fixture: ComponentFixture<ProfileStatisticsNodataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileStatisticsNodataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileStatisticsNodataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
