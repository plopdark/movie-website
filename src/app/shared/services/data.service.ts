import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {MoviesResp} from "../../utils/interfaces/movie.interface";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly baseUrl = 'https://api.themoviedb.org/3';
  private readonly apiKey  = 'b6d11d480708819dbcbde3485c5a9ef7';
  private readonly bearerToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNmQxMWQ0ODA3MDg4MTlkYmNiZGUzNDg1YzVhOWVmNyIsIm5iZiI6MTc0NTQzMDcwOC4yMzksInN1YiI6IjY4MDkyOGI0Yzk2ZTBkY2MwNWVlNTg1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a6YffmhF_cFuY9Gca1--kNIIY1MhyhUJqe8AsexhFNQ';

  private http = inject(HttpClient);

  public getTopRatedMoviesChanges(): Observable<MoviesResp> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.bearerToken}`
    });

    const params = new HttpParams()
       .set('api_key', this.apiKey)
       .set('language', 'en-US')
       .set('page', '1');

    return this.http.get<MoviesResp>(`${this.baseUrl}/movie/top_rated`, { headers, params });
  }
}
