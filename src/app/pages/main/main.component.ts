import {Component, inject, OnInit} from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {DataService} from '../../shared/services/data.service';
import {Media} from '../../utils/interfaces/movie.interface';
import {MediaShowListComponent} from '../../shared/components/media-show-list/media-show-list.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, MediaShowListComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit{
  private dataService = inject(DataService)

  public movies: Media[] = []

  public ngOnInit() {
    this.dataService.getTopRatedMoviesChanges().subscribe(el => this.movies = el.results);
    this.dataService.getAllGenres().subscribe(el=>console.log(el))
  }
}
