import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Adjunto } from '../models/adjunto';
import {
  URL_BASE_V1,
  JWT_NAME,
  loadHeader,
  handleError,
} from '../utils/constantes';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class AdjuntoService {
  constructor(private http: HttpClient, private alertService: AlertService) {}

  uploadFile(ticketId: number, file: File) {
    const formData: FormData = new FormData();

    formData.append('ticketId', ticketId.toString());
    formData.append('file', file);

    const request = new HttpRequest(
      'POST',
      `${URL_BASE_V1}ticket/add/adjunto`,
      formData,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + (localStorage.getItem(JWT_NAME) ?? ''),
        }),
        reportProgress: true,
        responseType: 'json',
      }
    );

    return this.http.request(request);
  }

  deleteFile(idAdjunto: number): Observable<Adjunto> {
    return this.http
      .delete<Adjunto>(
        `${URL_BASE_V1}adjunto/delete/${idAdjunto}`,
        loadHeader()
      )
      .pipe(catchError(handleError<Adjunto>(null, this.alertService)));
  }
}
