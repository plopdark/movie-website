import {Component, inject, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Icons} from '../../../../utils/enums/icons.enum';
import {Genre, Media} from '../../../../utils/interfaces/movie.interface';
import {DataService} from '../../../services/data.service';

@Component({
  selector: 'app-media-column-list-item',
  standalone: true,
  imports: [],
  templateUrl: './media-column-list-item.component.html',
  styleUrl: './media-column-list-item.component.scss'
})
export class MediaColumnListItemComponent implements OnChanges{
  @Input() public media?: Media;

  public dataService = inject(DataService)

  public releaseDate: string = '';

  public genreList: string[] = [];

  public adultValue: string = ''

  public title: string = '';

  public readonly watchlistPlusIcon = Icons.WatchlistMarkerPlus;

  public readonly goldStarIcon = Icons.GoldStarIcon;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['media'] && this.media) {
      if(this.media?.release_date!) {
        this.releaseDate = this.media.release_date.slice(0, 4)
      } else if (this.media?.first_air_date!){
        this.releaseDate = this.media.first_air_date.slice(0, 4)
      }
      if(this.media.title){
        this.title = this.media.title
      } else if(this.media.name){
        this.title = this.media.name;
      }
      this.dataService.getAllGenres().subscribe(res => {
        const genres: Genre[] = res.genres;
        this.genreList = this.media!.genre_ids
          .map(id => genres.find(g => g.id === id)?.name)
          .filter((name): name is string => !!name);
      });
      this.adultValue = this.media.adult ? 'R' : 'PG-13'
    }
  }
}
