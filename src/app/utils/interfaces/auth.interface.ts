export interface TokenResponse {
   request_token: string;
}

export interface ValidateResponse {
   success: boolean;
   request_token: string;
}

export interface SessionResponse {
   success: boolean;
   session_id: string;
}

export interface user {
   avatar: any;
   id: number;
   include_adult: boolean;
   iso_639_1: string;
   iso_3166_1: string;
   name: string;
   username: string;
}
