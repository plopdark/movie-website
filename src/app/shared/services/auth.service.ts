import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, map, Observable } from 'rxjs';
import {
  SessionResponse,
  TokenResponse,
  user,
  ValidateResponse,
} from '../../utils/interfaces/auth.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = 'https://api.themoviedb.org/3';

  private readonly apiKey = 'b6d11d480708819dbcbde3485c5a9ef7';

  private readonly bearerToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNmQxMWQ0ODA3MDg4MTlkYmNiZGUzNDg1YzVhOWVmNyIsIm5iZiI6MTc0NTQzMDcwOC4yMzksInN1YiI6IjY4MDkyOGI0Yzk2ZTBkY2MwNWVlNTg1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a6YffmhF_cFuY9Gca1--kNIIY1MhyhUJqe8AsexhFNQ';

  private http = inject(HttpClient);

  private userSubject = new BehaviorSubject<user | null>(null);

  public user$ = this.userSubject.asObservable();

  public accountId: number = 0;

  public get headers() {
    return new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${this.bearerToken}`,
    });
  }

  private getRequestToken() {
    return this.http.get<TokenResponse>(
      `${this.baseUrl}/authentication/token/new?api_key=${this.apiKey}`,
    );
  }

  private validateWithLogin(
    username: string,
    password: string,
    request_token: string,
  ) {
    return this.http.post<ValidateResponse>(
      `${this.baseUrl}/authentication/token/validate_with_login?api_key=${this.apiKey}`,
      { username, password, request_token },
    );
  }

  private createSession(request_token: string) {
    return this.http.post<SessionResponse>(
      `${this.baseUrl}/authentication/session/new?api_key=${this.apiKey}`,
      { request_token },
    );
  }

  public logIn(username: string, password: string): Observable<void> {
    return this.getRequestToken().pipe(
      switchMap((tokenRes) =>
        this.validateWithLogin(username, password, tokenRes.request_token).pipe(
          map(() => tokenRes.request_token),
        ),
      ),
      switchMap((request_token) =>
        this.createSession(request_token).pipe(
          map((sessRes) => sessRes.session_id),
        ),
      ),
      tap((session_id) => {
        localStorage.setItem('session_id', session_id);
      }),
      switchMap((session_id) => this.fetchAccountDetails(session_id)),
      map(() => void 0),
    );
  }

  public logOut(): void {
    localStorage.removeItem('session_id');
  }

  public isLoggedIn(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    return !!localStorage.getItem('session_id');
  }

  private fetchUser(): void {
    const sessionId = localStorage.getItem('session_id');

    this.http
      .get<user>(`${this.baseUrl}/account?session_id=${sessionId}`, {
        headers: this.headers,
      })
      .subscribe({
        next: (user) => this.userSubject.next(user),
        error: () => {
          this.userSubject.next(null);
        },
      });
  }

  public getUser(): Observable<user> {
    if (!this.userSubject.value) {
      this.fetchUser();
    }
    return this.user$ as Observable<user>;
  }

  public fetchAccountDetails(
    sessionId: string,
  ): Observable<{ id: number; username: string }> {
    return this.http
      .get<{ id: number; username: string }>(`${this.baseUrl}/account`, {
        headers: this.headers,
        params: new HttpParams()
          .set('api_key', this.apiKey)
          .set('session_id', sessionId),
      })
      .pipe(tap((account) => (this.accountId = account.id)));
  }
}
