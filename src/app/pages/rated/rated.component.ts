import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { Media } from '../../utils/interfaces/media.interface';
import { DataService } from '../../shared/services/data.service';
import { AuthService } from '../../shared/services/auth.service';
import { MediaColumnListComponent } from '../../shared/components/media-column-list/media-column-list.component';

@Component({
  selector: 'app-rated',
  standalone: true,
  imports: [HeaderComponent, MediaColumnListComponent],
  templateUrl: './rated.component.html',
  styleUrl: './rated.component.scss',
})
export class RatedComponent implements OnInit {
  private route = inject(ActivatedRoute);

  private dataService = inject(DataService);

  private auth = inject(AuthService);

  public title: string = '';

  public ratedMedia: Media[] = [];

  private accountId: number = 0;

  public ngOnInit() {
    const type = this.route.snapshot.paramMap.get('type');

    this.accountId = this.auth.accountId;

    if (type === 'tv') {
      this.title = 'Rated TV Series';
      this.loadRatedMedia('tv', this.accountId);
    } else {
      this.title = 'Rated Movies';
      this.loadRatedMedia('movies', this.accountId);
    }
  }

  public loadRatedMedia(mediaType: 'movies' | 'tv', id: number) {
    this.dataService.getAccountRatedMedia(mediaType, id).subscribe((res) => {
      this.ratedMedia = res.results;
    });
  }
}
