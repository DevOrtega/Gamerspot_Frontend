import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedsGetComponent } from './feed-get.component';

describe('FeedsGetComponent', () => {
  let component: FeedsGetComponent;
  let fixture: ComponentFixture<FeedsGetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedsGetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedsGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
