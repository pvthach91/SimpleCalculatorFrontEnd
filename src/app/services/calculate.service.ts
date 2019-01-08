import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OneParamCalculation} from '../home/one-param-calculation';
import {TwoParamCalculation} from '../home/two-param-calculation';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CalculateService {

  private calcOneParamUrl = 'http://localhost:8080/api/calculateOneParam';
  private calcTwoParamUrl = 'http://localhost:8080/api/calculateTwoParam';

  constructor(private http: HttpClient) { }

  calculateOneParam(calc: OneParamCalculation): Observable<number> {
    return this.http.post<number>(this.calcOneParamUrl, calc, httpOptions);
  }

  calculateTwoParam(calc: TwoParamCalculation): Observable<number> {
    return this.http.post<number>(this.calcTwoParamUrl, calc, httpOptions);
  }
}
