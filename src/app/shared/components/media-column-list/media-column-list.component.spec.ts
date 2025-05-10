import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaColumnListComponent } from './media-column-list.component';

describe('MediaColumnListComponent', () => {
  let component: MediaColumnListComponent;
  let fixture: ComponentFixture<MediaColumnListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaColumnListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaColumnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
