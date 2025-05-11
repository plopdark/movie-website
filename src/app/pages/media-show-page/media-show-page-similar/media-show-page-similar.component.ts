import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MediaType } from '../../../utils/types/types';
import { Media } from '../../../utils/interfaces/media.interface';

@Component({
  selector: 'app-media-show-page-similar',
  standalone: true,
  imports: [],
  templateUrl: './media-show-page-similar.component.html',
  styleUrl: './media-show-page-similar.component.scss',
})
export class MediaShowPageSimilarComponent {
  @Input() public similars: Media[] = [];

  @Input() public filledStarButton!: string;

  @Input() public emptyStarButton!: string;

  @Input() public similarRatings = new Map<number, number>();

  @Input() public mediaType!: MediaType;

  @Input() public watchlistMap = new Map<number, boolean>();

  @Input() public initialModalId: number | null = null;

  @Input() public emptyBookmark: string = '';

  @Input() public filledBookmark: string = '';

  @Output() public mediaClick = new EventEmitter<Media>();

  @Output() public toggleWatch = new EventEmitter<Media>();

  @Output() public toggleRating = new EventEmitter<Media>();

  @Output() public ratingSubmit = new EventEmitter<{
    item: Media;
    rating: number;
  }>();

  public modalOpenId: number | null = null;

  public onMediaClick(item: Media) {
    this.mediaClick.emit(item);
  }

  public onToggleWatch(similar: Media) {
    this.toggleWatch.emit(similar);
  }

  public onToggleRating(similar: Media) {
    this.modalOpenId = this.modalOpenId === similar.id ? null : similar.id;
  }

  public onSubmitRating(similar: Media) {
    const value = this.similarRatings.get(similar.id) ?? 0;
    if (value > 0) {
      this.ratingSubmit.emit({ item: similar, rating: value });
      this.modalOpenId = null;
    }
  }

  public selectRating(similarId: number, value: number): void {
    this.similarRatings.set(similarId, value);
  }

  public getBookmarkIcon(id: number): string {
    return this.watchlistMap.get(id) ? this.filledBookmark : this.emptyBookmark;
  }

  public closeRatingForSimilar(): void {
    this.modalOpenId = null;
  }
}
