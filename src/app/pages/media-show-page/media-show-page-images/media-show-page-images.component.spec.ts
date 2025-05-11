import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaShowPageImagesComponent } from './media-show-page-images.component';

describe('MediaShowPageImagesComponent', () => {
  let component: MediaShowPageImagesComponent;
  let fixture: ComponentFixture<MediaShowPageImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaShowPageImagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaShowPageImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
