import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaShowPageCreditsComponent } from './media-show-page-credits.component';

describe('MediaShowPageCreditsComponent', () => {
  let component: MediaShowPageCreditsComponent;
  let fixture: ComponentFixture<MediaShowPageCreditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaShowPageCreditsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaShowPageCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
