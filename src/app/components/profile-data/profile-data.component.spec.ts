import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDataComponent } from './profile-data.component';

describe('ProfileDataComponent', () => {
  let component: ProfileDataComponent;
  let fixture: ComponentFixture<ProfileDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
