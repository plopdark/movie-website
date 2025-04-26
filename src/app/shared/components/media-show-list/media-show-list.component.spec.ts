import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaShowListComponent } from './media-show-list.component';

describe('MoviesShowListComponent', () => {
  let component: MediaShowListComponent;
  let fixture: ComponentFixture<MediaShowListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaShowListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaShowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
