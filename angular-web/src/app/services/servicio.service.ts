import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { PageResponse } from '../models/Parametros';
import { Servicio, ServicioCombo } from '../models/servicio';
import { handleError, loadHeader, URL_BASE_V1 } from '../utils/constantes';

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  servicio: Servicio;

  constructor(private http: HttpClient) {}

  listServicio(
    page?: number,
    size?: number
  ): Observable<PageResponse<Servicio[]>> {
    return this.http
      .get<PageResponse<Servicio[]>>(
        `${URL_BASE_V1}servicios/?page=${page}&size=${size}`,
        loadHeader()
      )
      .pipe(
        tap((_) => console.log('Loading servicios...')),
        catchError(handleError<PageResponse<Servicio[]>>(null))
      );
  }

  addServicio(servicio: Servicio): Observable<any> {
    const body = JSON.stringify(servicio);
    console.log(body);
    return this.http.post<Servicio>(
      `${URL_BASE_V1}servicios/`,
      body,
      loadHeader()
    );
  }

  updateServicio(id: any, servicio: Servicio): Observable<any> {
    const body = JSON.stringify(servicio);
    console.log(body);
    return this.http.put<any>(
      `${URL_BASE_V1}servicios/${id}`,
      body,
      loadHeader()
    );
  }

  deleteServicio(id: any): Observable<any> {
    return this.http.delete<any>(`${URL_BASE_V1}servicios/${id}`, loadHeader());
  }

  getCombo(): Observable<ServicioCombo[]> {
    return this.http.get<ServicioCombo[]>(
      `${URL_BASE_V1}servicios/combo`,
      loadHeader()
    );
  }
}
