import {Component, Input} from '@angular/core';
import {Icons} from '../../../../utils/enums/icons.enum';
import {Media} from '../../../../utils/interfaces/movie.interface';

@Component({
  selector: 'app-media-show-list-item',
  standalone: true,
  imports: [],
  templateUrl: './media-show-list-item.component.html',
  styleUrl: './media-show-list-item.component.scss'
})
export class MediaShowListItemComponent {
  @Input() public movie?: Media;

  public readonly watchlistPlusIcon = Icons.WatchlistMarkerPlus;

  public readonly goldStarIcon = Icons.GoldStarIcon;
}
