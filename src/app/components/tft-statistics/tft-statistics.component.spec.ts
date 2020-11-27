import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TftStatisticsComponent } from './tft-statistics.component';

describe('TftStatisticsComponent', () => {
  let component: TftStatisticsComponent;
  let fixture: ComponentFixture<TftStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TftStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TftStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
