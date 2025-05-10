import { Component, inject, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { AuthService } from '../../shared/services/auth.service';
import { MediaResp } from '../../utils/interfaces/movie.interface';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit {
  private data = inject(DataService);

  public watchList: MediaResp[] = [];

  private id: number = 21967768;

  public session = localStorage.getItem('session_id');

  public ngOnInit() {
    this.data
      .getWatchList(this.id, this.session!)
      .subscribe((el) => console.log(el));
  }
}
