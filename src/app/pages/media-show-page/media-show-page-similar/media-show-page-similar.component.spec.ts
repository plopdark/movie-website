import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaShowPageSimilarComponent } from './media-show-page-similar.component';

describe('MediaShowPageSimilarComponent', () => {
  let component: MediaShowPageSimilarComponent;
  let fixture: ComponentFixture<MediaShowPageSimilarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaShowPageSimilarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaShowPageSimilarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
