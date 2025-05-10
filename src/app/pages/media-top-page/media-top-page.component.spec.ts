import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaTopPageComponent } from './media-top-page.component';

describe('MegiaPageComponent', () => {
  let component: MediaTopPageComponent;
  let fixture: ComponentFixture<MediaTopPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaTopPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaTopPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
