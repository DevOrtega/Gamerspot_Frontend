import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerstatisticsComponent } from './playerstatistics.component';

describe('PlayerstatisticsComponent', () => {
  let component: PlayerstatisticsComponent;
  let fixture: ComponentFixture<PlayerstatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerstatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerstatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
