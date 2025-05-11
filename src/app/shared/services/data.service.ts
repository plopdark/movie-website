import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import {
  AccountStates,
  CreditsResp,
  GenresResp,
  MediaImagesList,
  MediaResp,
  MovieDetails,
  MultiSearchResp,
  RatedMediaResp,
  ReleaseDatesResp,
  ReviewResp,
  TvContentRatingResp,
  VideoResp,
} from '../../utils/interfaces/media.interface';
import { MediaType } from '../../utils/types/types';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly baseUrl = 'https://api.themoviedb.org/3';

  private readonly apiKey = 'b6d11d480708819dbcbde3485c5a9ef7';

  private readonly bearerToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNmQxMWQ0ODA3MDg4MTlkYmNiZGUzNDg1YzVhOWVmNyIsIm5iZiI6MTc0NTQzMDcwOC4yMzksInN1YiI6IjY4MDkyOGI0Yzk2ZTBkY2MwNWVlNTg1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a6YffmhF_cFuY9Gca1--kNIIY1MhyhUJqe8AsexhFNQ';

  private http = inject(HttpClient);

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${this.bearerToken}`,
    });
  }

  private get headersForWatchlist(): HttpHeaders {
    return new HttpHeaders({ Accept: 'application/json' });
  }

  private get defaultParams(): HttpParams {
    return new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'en-US');
  }

  public getTopRatedMediaChanges(mediaType: MediaType): Observable<MediaResp> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'en-US')
      .set('page', '1');

    return this.http.get<MediaResp>(`${this.baseUrl}/${mediaType}/top_rated`, {
      headers: this.headers,
      params,
    });
  }

  public getHundredTopRatedMedia(
    mediaType: MediaType,
    pagesToLoad: number = 5,
  ): Observable<MediaResp> {
    const requests = Array.from({ length: pagesToLoad }, (_, i) => {
      const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('language', 'en-US')
        .set('page', (i + 1).toString());

      return this.http.get<MediaResp>(
        `${this.baseUrl}/${mediaType}/top_rated`,
        { headers: this.headers, params },
      );
    });

    return forkJoin(requests).pipe(
      map((responses) => {
        const allResults = responses.flatMap((response) => response.results);
        return {
          page: 1,
          results: allResults,
          total_pages: responses[0].total_pages,
          total_results: allResults.length,
        } as MediaResp;
      }),
    );
  }

  public getAllGenres(): Observable<GenresResp> {
    return this.http.get<GenresResp>(`${this.baseUrl}/genre/movie/list`, {
      headers: this.headers,
      params: this.defaultParams,
    });
  }

  private postParams(sessionId: string) {
    return new HttpParams()
      .set('api_key', this.apiKey)
      .set('session_id', sessionId);
  }

  public toggleWatchlist(
    accountId: number,
    mediaType: 'movie' | 'tv',
    mediaId: number,
    watchlist: boolean,
    sessionId: string,
  ): Observable<{ success: boolean; status_message?: string }> {
    const url = `${this.baseUrl}/account/${accountId}/watchlist`;
    const body = { media_type: mediaType, media_id: mediaId, watchlist };

    return this.http.post<{ success: boolean; status_message?: string }>(
      url,
      body,
      {
        headers: new HttpHeaders({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
        params: this.postParams(sessionId),
      },
    );
  }

  public getWatchList(
    accountId: number,
    sessionId: string,
  ): Observable<MediaResp> {
    const params = this.postParams(sessionId)
      .set('language', 'en-US')
      .set('sort_by', 'created_at.asc')
      .set('page', '1');

    const movies$ = this.http.get<MediaResp>(
      `${this.baseUrl}/account/${accountId}/watchlist/movies`,
      { headers: this.headersForWatchlist, params },
    );
    const tv$ = this.http.get<MediaResp>(
      `${this.baseUrl}/account/${accountId}/watchlist/tv`,
      { headers: this.headersForWatchlist, params },
    );

    return forkJoin([movies$, tv$]).pipe(
      map(([movie, tv]) => ({
        page: 1,
        results: [...movie.results, ...tv.results],
        total_pages: 1,
        total_results: movie.results.length + tv.results.length,
      })),
    );
  }

  public searchMulti(
    query: string,
    page: number = 1,
  ): Observable<MultiSearchResp> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'en-US')
      .set('query', query)
      .set('include_adult', 'false')
      .set('page', page.toString());

    return this.http.get<MultiSearchResp>(`${this.baseUrl}/search/multi`, {
      headers: this.headers,
      params,
    });
  }

  public getMediaVideos(
    mediaType: MediaType,
    id: number,
  ): Observable<VideoResp> {
    return this.http.get<VideoResp>(
      `${this.baseUrl}/${mediaType}/${id}/videos`,
      {
        headers: this.headers,
        params: this.defaultParams,
      },
    );
  }

  public getMediaCredits(
    mediaType: MediaType,
    id: number,
  ): Observable<CreditsResp> {
    return this.http.get<CreditsResp>(
      `${this.baseUrl}/${mediaType}/${id}/credits`,
      {
        headers: this.headers,
        params: this.defaultParams,
      },
    );
  }

  public getMovieContentRatings(id: number): Observable<ReleaseDatesResp> {
    return this.http.get<ReleaseDatesResp>(
      `${this.baseUrl}/movie/${id}/release_dates`,
      { headers: this.headers, params: this.defaultParams },
    );
  }

  public getTvContentRatings(id: number): Observable<TvContentRatingResp> {
    return this.http.get<TvContentRatingResp>(
      `${this.baseUrl}/tv/${id}/content_ratings`,
      { headers: this.headers, params: this.defaultParams },
    );
  }

  public getAllMediaDetails(
    mediaType: MediaType,
    id: number,
  ): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(`${this.baseUrl}/${mediaType}/${id}`, {
      headers: this.headers,
      params: this.defaultParams,
    });
  }

  public getSimilarMedia(
    mediaType: MediaType,
    id: number,
  ): Observable<MediaResp> {
    return this.http.get<MediaResp>(
      `${this.baseUrl}/${mediaType}/${id}/similar`,
      {
        headers: this.headers,
        params: this.defaultParams,
      },
    );
  }

  public getMediaImages(
    media: MediaType,
    id: number,
  ): Observable<MediaImagesList> {
    const params = new HttpParams().set('api_key', this.apiKey);

    return this.http.get<MediaImagesList>(
      `${this.baseUrl}/${media}/${id}/images`,
      {
        headers: this.headers,
        params,
      },
    );
  }

  public getMediaReviews(media: MediaType, id: number): Observable<ReviewResp> {
    const params = new HttpParams().set('api_key', this.apiKey);

    return this.http.get<ReviewResp>(`${this.baseUrl}/${media}/${id}/reviews`, {
      headers: this.headers,
      params,
    });
  }

  public postMediaRating(
    media: MediaType,
    id: number,
    sessionId: string,
    rating: number,
  ): Observable<{ status_code: number; status_message: string }> {
    const url = `${this.baseUrl}/${media}/${id}/rating`;

    const body = { value: rating };

    const headers = this.headers.set(
      'Content-Type',
      'application/json;charset=utf-8',
    );

    return this.http.post<{ status_code: number; status_message: string }>(
      url,
      body,
      { headers, params: this.postParams(sessionId) },
    );
  }

  public getAccountStates(
    media: MediaType,
    id: number,
    sessionId: string,
  ): Observable<AccountStates> {
    return this.http.get<AccountStates>(
      `${this.baseUrl}/${media}/${id}/account_states`,
      { headers: this.headers, params: this.postParams(sessionId) },
    );
  }

  public getAccountRatedMedia(
    mediaType: 'movies' | 'tv',
    id: number,
  ): Observable<RatedMediaResp> {
    return this.http.get<RatedMediaResp>(
      `${this.baseUrl}/account/${id}/rated/${mediaType}`,
      { headers: this.headers, params: this.defaultParams },
    );
  }
}
