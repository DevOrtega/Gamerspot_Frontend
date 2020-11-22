import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LolStatisticsComponent } from './lol-statistics.component';

describe('LolStatisticsComponent', () => {
  let component: LolStatisticsComponent;
  let fixture: ComponentFixture<LolStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LolStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LolStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
