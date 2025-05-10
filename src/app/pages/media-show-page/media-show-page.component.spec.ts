import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaShowPageComponent } from './media-show-page.component';

describe('MediaShowPageComponent', () => {
  let component: MediaShowPageComponent;
  let fixture: ComponentFixture<MediaShowPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaShowPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaShowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
