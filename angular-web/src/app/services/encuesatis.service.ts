import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Encuesta } from '../models/encuesta';
import { handleError, loadHeader, URL_BASE_V1 } from '../utils/constantes';

@Injectable({
  providedIn: 'root'
})
export class EncuesatisService {

  constructor(private http: HttpClient) {}

  registerEncuesta(Encuesta:any){
    return this.http
    .post<any>(`${URL_BASE_V1}encuesta/`,Encuesta);
  }

}
