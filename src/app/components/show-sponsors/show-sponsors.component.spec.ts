import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSponsorsComponent } from './show-sponsors.component';

describe('ShowSponsorsComponent', () => {
  let component: ShowSponsorsComponent;
  let fixture: ComponentFixture<ShowSponsorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSponsorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSponsorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
