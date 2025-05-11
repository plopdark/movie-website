import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { DataService } from '../../shared/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import { CreditItem, Person } from '../../utils/interfaces/media.interface';
import { MediaColumnListComponent } from '../../shared/components/media-column-list/media-column-list.component';

@Component({
  selector: 'app-person-page',
  standalone: true,
  imports: [HeaderComponent, MediaColumnListComponent],
  templateUrl: './person-page.component.html',
  styleUrl: './person-page.component.scss',
})
export class PersonPageComponent implements OnInit {
  private dataService = inject(DataService);

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  public person?: Person;

  public personAge: number = 0;

  public credits?: CreditItem[] = [];

  public ngOnInit() {
    this.loadPerson();
  }

  private loadPerson(): void {
    this.route.paramMap
      .pipe(
        map((params) => Number(params.get('id'))),
        switchMap((id) =>
          isNaN(id) ? of(null) : this.dataService.getPersonDetails(id),
        ),
      )
      .subscribe((person) => {
        if (!person) {
          this.router.navigate(['']);
        }
        this.person = person!;
        this.calculatePersonAge();
        this.loadPersonCredits();
      });
  }

  private calculatePersonAge(): void {
    const birthYear = new Date(this.person!.birthday).getFullYear();

    const endYear = this.person!.deathday
      ? new Date(this.person!.deathday).getFullYear()
      : new Date().getFullYear();

    this.personAge = endYear - birthYear;
  }

  private loadPersonCredits(): void {
    this.dataService
      .getPersonAllCredits(this.person!.id)
      .subscribe((credits) => {
        const getDate = (c: CreditItem): number => {
          if (c.release_date) {
            return new Date(c.release_date).getTime();
          } else if (c.first_air_date) {
            return new Date(c.first_air_date).getTime();
          } else {
            return 0;
          }
        };

        this.credits = credits.sort((a, b) => getDate(b) - getDate(a));
      });
  }
}
