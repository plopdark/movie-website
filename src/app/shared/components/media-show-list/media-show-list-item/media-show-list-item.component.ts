import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Icons } from '../../../../utils/enums/icons.enum';
import { Media } from '../../../../utils/interfaces/movie.interface';
import { DataService } from '../../../services/data.service';
import { MediaType } from '../../../../utils/types/types';
import { RoutingEnum } from '../../../../utils/enums/routing.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-media-show-list-item',
  standalone: true,
  imports: [],
  templateUrl: './media-show-list-item.component.html',
  styleUrl: './media-show-list-item.component.scss',
})
export class MediaShowListItemComponent implements OnInit, OnChanges {
  private router = inject(Router);

  @Input() media!: Media;

  @Input() accountId = 0;

  @Input() isInWatchlist = false;

  @Output() toggle = new EventEmitter<void>();

  private dataService = inject(DataService);

  public cdr = inject(ChangeDetectorRef);

  public mediaTitle: string = '';

  public bookMarkIcon: string = '';

  public mediaId: number = 0;

  public session = localStorage.getItem('session_id');

  private get mediaType(): 'movie' | 'tv' {
    return this.media.title ? 'movie' : 'tv';
  }

  public readonly notInWatchlistIcon = Icons.WatchlistMarkerPlus;

  public readonly inWatchListIcon = Icons.BookmarkYellow;

  public readonly goldStarIcon = Icons.GoldStarIcon;

  public ngOnInit() {
    this.mediaId = this.media?.id;
    this.updateIcon();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['media']) {
      this.mediaTitle = this.media.title || this.media.name!;
    }

    if (changes['isInWatchlist']) {
      this.bookMarkIcon = this.isInWatchlist
        ? this.inWatchListIcon
        : this.notInWatchlistIcon;
    }

    this.cdr.markForCheck();
  }

  private updateIcon() {
    this.bookMarkIcon = this.isInWatchlist
      ? this.inWatchListIcon
      : this.notInWatchlistIcon;
  }

  public toggleWatchList() {
    const add = !this.isInWatchlist;
    this.dataService
      .toggleWatchlist(
        this.accountId,
        this.mediaType,
        this.media.id,
        add,
        this.session!,
      )
      .subscribe((res) => {
        if (res.success) {
          this.isInWatchlist = add;
          this.bookMarkIcon = add
            ? this.inWatchListIcon
            : this.notInWatchlistIcon;
          console.log(
            `Updated watchlist status for media ID ${this.media.id}: ${this.isInWatchlist}`,
          );
          this.toggle.emit();
          this.cdr.markForCheck();
        }
      });
  }

  public onMediaClick(item: Media): void {
    const type: MediaType = item.title ? 'movie' : 'tv';
    this.router.navigate([RoutingEnum.MediaShow, type, item.id], {
      state: { media: item },
    });
  }
}
