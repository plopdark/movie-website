import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { DataService } from '../../shared/services/data.service';
import { Media, TopPersons } from '../../utils/interfaces/media.interface';
import { Icons } from '../../utils/enums/icons.enum';
import { MediaType } from '../../utils/types/types';
import { RoutingEnum } from '../../utils/enums/routing.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-persons-top-page',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './persons-top-page.component.html',
  styleUrl: './persons-top-page.component.scss',
})
export class PersonsTopPageComponent implements OnInit {
  private dataService = inject(DataService);

  private router = inject(Router);

  public persons: TopPersons[] = [];

  public readonly filledStar = Icons.GoldStarIcon;

  public ngOnInit() {
    this.dataService.getPopularPeople().subscribe((persons) => {
      this.persons = persons.results;
      console.log(this.persons);
    });
  }

  public onMediaClick(item: Media): void {
    const type: MediaType = item.title ? 'movie' : 'tv';
    this.router.navigate([RoutingEnum.MediaShow, type, item.id], {
      state: { media: item },
    });
  }

  public onPersonClick(personId: number): void {
    this.router.navigate([RoutingEnum.Person, personId]);
  }
}
