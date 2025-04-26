import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaShowListItemComponent } from './media-show-list-item.component';

describe('MoviesShowListItemComponent', () => {
  let component: MediaShowListItemComponent;
  let fixture: ComponentFixture<MediaShowListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaShowListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaShowListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
