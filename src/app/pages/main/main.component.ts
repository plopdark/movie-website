import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { DataService } from '../../shared/services/data.service';
import { Media } from '../../utils/interfaces/media.interface';
import { MediaShowListComponent } from '../../shared/components/media-show-list/media-show-list.component';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, MediaShowListComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  private dataService = inject(DataService);

  private auth = inject(AuthService);

  public movies: Media[] = [];

  public tvSeries: Media[] = [];

  public watchListIds = new Set<number>();

  public accountId: number = 0;

  public session = localStorage.getItem('session_id');

  public ngOnInit() {
    this.accountId = this.auth.accountId;

    this.dataService
      .getTopRatedMediaChanges('movie')
      .subscribe((el) => (this.movies = el.results));

    this.dataService
      .getTopRatedMediaChanges('tv')
      .subscribe((el) => (this.tvSeries = el.results));

    this.dataService
      .getWatchList(this.accountId, this.session!)
      .subscribe((resp) => {
        this.watchListIds = new Set(resp.results.map((item) => item.id));
      });

    this.dataService
      .getWatchList(this.accountId, this.session!)
      .subscribe((resp) => console.log(resp));
  }

  public onChildToggle(): void {
    this.dataService
      .getWatchList(this.accountId, this.session!)
      .subscribe((wl) => {
        this.watchListIds = new Set(wl.results.map((m) => m.id));
        console.log('Updated watchListIds:', this.watchListIds);
      });
  }
}
