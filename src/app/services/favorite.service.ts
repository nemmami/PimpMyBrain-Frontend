import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {handleError} from '../utils/handle_errors';
import {environement} from 'src/environement/environement';
import {Favorite} from '../models/favorite';
import {getToken} from "../utils/utils";

@Injectable({
  providedIn: 'root'
})

export class FavoriteService {

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': getToken(),
      'Content-Type': 'application/json'
    })
  };

  url: string = `${environement.ROOT_URL}/favorites`;

  constructor(private http: HttpClient) {
  }

  getFavoritessByUser(id_user: number): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(`${(this.url)}/${id_user}`, this.httpOptions).pipe(
        tap(_ => console.log('fetched notifications')),
        catchError(handleError));
  }

  /**
   * Get the favorite of the connected user (it's requested with the token)
   */
  getUserProfileLike(id_teacher: number): Observable<Favorite> {
    return this.http.get<Favorite>(`${this.url}/${id_teacher}`, this.httpOptions)
      .pipe(catchError(handleError));
  }
}
