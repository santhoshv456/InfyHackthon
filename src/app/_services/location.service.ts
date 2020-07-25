import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Payload } from '../_models/payload';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  sendDistance(distance: Payload) {
    return this.http.post(this.baseUrl + '/distance', distance);
  }

}
