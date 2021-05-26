import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Medio, MedioForm, Ticket } from '../models/medio';
import { handleError, loadHeader, URL_BASE_V1 } from '../utils/constantes';
@Injectable({
  providedIn: 'root',
})
export class MedioService {
  constructor(private http: HttpClient) {}

  async save(medio: MedioForm): Promise<Medio> {
    const newMedio = await this.http
      .post<Medio>(`${URL_BASE_V1}medio-comunicacion/`, medio, loadHeader())
      .toPromise();
    return newMedio;
  }

  delete(medio_id: number): Observable<any> {
    return this.http
      .delete<any>(`${URL_BASE_V1}medio-comunicacion/${medio_id}`, loadHeader())
      .pipe(catchError(handleError<any>(null)));
  }
}
