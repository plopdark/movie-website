import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaColumnListItemComponent } from './media-column-list-item.component';

describe('MediaColumnListItemComponent', () => {
  let component: MediaColumnListItemComponent;
  let fixture: ComponentFixture<MediaColumnListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaColumnListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaColumnListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
