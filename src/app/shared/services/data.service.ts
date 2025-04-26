import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {forkJoin, map, Observable} from "rxjs";
import {MediaResp} from "../../utils/interfaces/movie.interface";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly baseUrl = 'https://api.themoviedb.org/3';
  private readonly apiKey  = 'b6d11d480708819dbcbde3485c5a9ef7';
  private readonly bearerToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNmQxMWQ0ODA3MDg4MTlkYmNiZGUzNDg1YzVhOWVmNyIsIm5iZiI6MTc0NTQzMDcwOC4yMzksInN1YiI6IjY4MDkyOGI0Yzk2ZTBkY2MwNWVlNTg1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a6YffmhF_cFuY9Gca1--kNIIY1MhyhUJqe8AsexhFNQ';

  private http = inject(HttpClient);

  public getTopRatedMoviesChanges(): Observable<MediaResp> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.bearerToken}`
    });

    const params = new HttpParams()
       .set('api_key', this.apiKey)
       .set('language', 'en-US')
       .set('page', '1');

    return this.http.get<MediaResp>(`${this.baseUrl}/movie/top_rated`, { headers, params });
  }

  public getHundredTopRatedMovies(pagesToLoad: number = 5): Observable<MediaResp>{
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.bearerToken}`
    });

    const requests = Array.from({ length: pagesToLoad }, (_, i) => {
      const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('language', 'en-US')
        .set('page', (i + 1).toString());

      return this.http.get<MediaResp>(`${this.baseUrl}/movie/top_rated`, { headers, params });
    });

    return forkJoin(requests).pipe(
      map((responses) => {
        const allResults = responses.flatMap(response => response.results);
        return {
          page: 1,
          results: allResults,
          total_pages: responses[0].total_pages,
          total_results: allResults.length,
        } as MediaResp;
      })
    );
  }

  public getAllGenres(): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.bearerToken}`
    });

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'en-US');

    return this.http.get(`${this.baseUrl}/genre/movie/list`, { headers, params });
  }

  public getTopRatedTvSeriesChanges(): Observable<MediaResp> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.bearerToken}`
    });

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'en-US')
      .set('page', '1');

    return this.http.get<MediaResp>(`${this.baseUrl}/tv/top_rated`, { headers, params });
  }

  public getHundredTopRatedTvSeries(pagesToLoad: number = 5): Observable<MediaResp>{
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.bearerToken}`
    });

    const requests = Array.from({ length: pagesToLoad }, (_, i) => {
      const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('language', 'en-US')
        .set('page', (i + 1).toString());

      return this.http.get<MediaResp>(`${this.baseUrl}/tv/top_rated`, { headers, params });
    });

    return forkJoin(requests).pipe(
      map((responses) => {
        const allResults = responses.flatMap(response => response.results);
        return {
          page: 1,
          results: allResults,
          total_pages: responses[0].total_pages,
          total_results: allResults.length,
        } as MediaResp;
      })
    );
  }
}
