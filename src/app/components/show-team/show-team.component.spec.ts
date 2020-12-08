import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTeamComponent } from './show-team.component';

describe('ShowTeamComponent', () => {
  let component: ShowTeamComponent;
  let fixture: ComponentFixture<ShowTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
