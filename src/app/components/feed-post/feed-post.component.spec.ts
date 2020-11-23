import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedsPostComponent } from './feed-post.component';

describe('FeedsPostComponent', () => {
  let component: FeedsPostComponent;
  let fixture: ComponentFixture<FeedsPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedsPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedsPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
