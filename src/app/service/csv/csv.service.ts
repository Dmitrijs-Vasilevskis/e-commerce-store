import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  constructor(private httpClient: HttpClient) { }

  getCsvDataFromAssests(path:string): Observable<string> {
    return this.httpClient.get(path, {responseType: 'text'});
  }
}
