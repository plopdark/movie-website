import {Component, Input, OnInit} from '@angular/core';
import {Icons} from '../../../../utils/enums/icons.enum';
import {Media} from '../../../../utils/interfaces/movie.interface';

@Component({
  selector: 'app-media-show-list-item',
  standalone: true,
  imports: [],
  templateUrl: './media-show-list-item.component.html',
  styleUrl: './media-show-list-item.component.scss'
})
export class MediaShowListItemComponent implements OnInit{
  @Input() public media?: Media;

  public mediaTitle: string = '';

  public readonly watchlistPlusIcon = Icons.WatchlistMarkerPlus;

  public readonly goldStarIcon = Icons.GoldStarIcon;

  public ngOnInit(){
    if(this.media?.title){
      this.mediaTitle = this.media.title
    } else if(this.media?.name){
      this.mediaTitle = this.media.name;
    }
  }
}
