import { Injectable } from '@angular/core';
import {Candidate} from '../shared/candidate';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(baseURL + 'candidate')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getCandidate(id: number): Observable<Candidate> {
    return this.http.get<Candidate>(baseURL + 'candidate/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
   }

   submitCandidate(candidate: Candidate): Observable<Candidate> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Candidate>(baseURL + 'candidate/', candidate, httpOptions)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

}