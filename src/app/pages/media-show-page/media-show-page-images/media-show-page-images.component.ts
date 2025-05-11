import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MediaImage } from '../../../utils/interfaces/media.interface';

@Component({
  selector: 'app-media-show-page-images',
  standalone: true,
  imports: [],
  templateUrl: './media-show-page-images.component.html',
  styleUrl: './media-show-page-images.component.scss',
})
export class MediaShowPageImagesComponent {
  @Input() public images: MediaImage[] = [];

  @Input() public selectedSrc: string | null = null;

  @Output() public imageClick = new EventEmitter<string>();

  @Output() public close = new EventEmitter<void>();

  public readonly baseSmall = 'https://image.tmdb.org/t/p/w500';

  public readonly baseLarge = 'https://image.tmdb.org/t/p/original';

  public onThumbClick(path: string) {
    this.imageClick.emit(path);
  }
  public onBackdropClick() {
    this.close.emit();
  }
}
