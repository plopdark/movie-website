import {Component, Input, OnChanges} from '@angular/core';
import {Media} from '../../../utils/interfaces/movie.interface';
import {MediaShowListItemComponent} from './media-show-list-item/media-show-list-item.component';
import {Icons} from '../../../utils/enums/icons.enum';

@Component({
  selector: 'app-media-show-list',
  standalone: true,
  imports: [
    MediaShowListItemComponent,
  ],
  templateUrl: './media-show-list.component.html',
  styleUrl: './media-show-list.component.scss'
})
export class MediaShowListComponent implements OnChanges{
  @Input() public movies: Media[] = [];

  @Input() public title: string = '';

  public visibleMedia: Media[] = [];

  public startIndex = 0;

  public itemsToShow = 5;

  public moveBy = 3;

  public readonly listButtonRight = Icons.ListButtonRight;

  public readonly listButtonLeft = Icons.ListButtonLeft;

  public ngOnChanges() {
    this.updateVisibleMovies();
  }

  public updateVisibleMovies() {
    this.visibleMedia = this.movies.slice(this.startIndex, this.startIndex + this.itemsToShow);
  }

  public loadMore() {
    if (this.startIndex + this.itemsToShow < this.movies.length) {
      this.startIndex += this.moveBy;
      this.updateVisibleMovies();
    }
  }

  public showLess() {
    if (this.startIndex - this.moveBy >= 0) {
      this.startIndex -= this.moveBy;
      this.updateVisibleMovies();
    } else {
      this.startIndex = 0;
      this.updateVisibleMovies();
    }
  }


  public canMoveBack(): boolean {
    return this.startIndex >= this.moveBy;
  }

  public canMoveForward(): boolean {
    return (this.startIndex + this.itemsToShow) < this.movies.length;
  }
}
