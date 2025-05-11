import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { DataService } from '../../shared/services/data.service';
import { Media } from '../../utils/interfaces/media.interface';
import { AuthService } from '../../shared/services/auth.service';
import { MediaColumnListComponent } from '../../shared/components/media-column-list/media-column-list.component';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [HeaderComponent, MediaColumnListComponent],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.scss',
})
export class WatchlistComponent implements OnInit {
  private dataService = inject(DataService);

  private auth = inject(AuthService);

  public watchlist: Media[] = [];

  private accountId: number = 0;

  private sessionId: string = '';

  public ngOnInit() {
    this.sessionId = localStorage.getItem('session_id')!;

    this.accountId = this.auth.accountId;

    this.dataService
      .getWatchList(this.accountId, this.sessionId)
      .subscribe((res) => {
        this.watchlist = res.results;
      });
  }
}
