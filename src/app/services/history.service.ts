import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HistoryInfo} from '../history/history-info';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private historyUrl = 'http://localhost:8080/api/histories';

  constructor(private http: HttpClient) { }

  getHistories(): Observable<HistoryInfo[]> {
    return this.http.get<HistoryInfo[]>(this.historyUrl);
  }
}
