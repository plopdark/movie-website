import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { Media } from '../../utils/interfaces/movie.interface';
import { DataService } from '../../shared/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { RoutingEnum } from '../../utils/enums/routing.enum';
import { MediaColumnListComponent } from '../../shared/components/media-column-list/media-column-list.component';

@Component({
  selector: 'app-media-top-page',
  standalone: true,
  imports: [HeaderComponent, MediaColumnListComponent],
  templateUrl: './media-top-page.component.html',
  styleUrl: './media-top-page.component.scss',
})
export class MediaTopPageComponent implements OnInit {
  public medias: Media[] = [];

  private dataService = inject(DataService);

  private route = inject(ActivatedRoute);

  public category: string = '';

  public ngOnInit() {
    const path = this.route.snapshot.routeConfig?.path!;
    if (path === RoutingEnum.Movies) {
      this.category = 'Movies';
      this.dataService.getHundredTopRatedMedia('movie').subscribe((el) => {
        this.medias = el.results;
      });
    } else if (path === RoutingEnum.TvSeries) {
      this.category = 'Tv Series';
      this.dataService.getHundredTopRatedMedia('tv').subscribe((el) => {
        this.medias = el.results;
      });
    }
  }
}
