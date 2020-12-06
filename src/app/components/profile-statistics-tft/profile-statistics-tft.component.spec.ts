import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStatisticsTftComponent } from './profile-statistics-tft.component';

describe('ProfileStatisticsTftComponent', () => {
  let component: ProfileStatisticsTftComponent;
  let fixture: ComponentFixture<ProfileStatisticsTftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileStatisticsTftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileStatisticsTftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
