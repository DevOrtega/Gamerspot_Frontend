import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostGetComponent } from './post-get.component';

describe('PostGetComponent', () => {
  let component: PostGetComponent;
  let fixture: ComponentFixture<PostGetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostGetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
