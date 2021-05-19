import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_BASE_V1, JWT_NAME } from '../utils/constantes';
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
}
