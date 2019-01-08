import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserInfo} from '../admin/user-info';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private adminUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(this.adminUrl);
  }
}
