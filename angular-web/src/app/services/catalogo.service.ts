import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CatalogoForm, CatalogoView } from '../models/catalogo';
import { handleError, loadHeader, URL_BASE_V1 } from '../utils/constantes';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class CatalogoService {
  constructor(private http: HttpClient, private alertService: AlertService) {}

  save(form: CatalogoForm): Observable<CatalogoView> {
    return this.http
      .post<CatalogoView>(`${URL_BASE_V1}catalogo/catalogo`, form, loadHeader())
      .pipe(catchError(handleError<CatalogoView>(null, this.alertService)));
  }
}
