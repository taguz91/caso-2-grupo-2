import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PageResponse } from '../models/Parametros';
import {
  AsignarForm,
  CerrarForm,
  TicketForm,
  TicketHome,
  TicketView,
} from '../models/ticket';
import {
  DEFAULT_PAGE_SIZE,
  handleError,
  loadHeader,
  URL_BASE_V1,
} from '../utils/constantes';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private http: HttpClient, private alertService: AlertService) {}

  registerTicket(newTicket: TicketForm): Observable<TicketView> {
    return this.http
      .post<TicketView>(`${URL_BASE_V1}ticket/save`, newTicket, loadHeader())
      .pipe(catchError(handleError<TicketView>(null)));
  }

  updateTicket(
    ticketId: number,
    newTicket: TicketForm
  ): Observable<TicketView> {
    return this.http
      .post<TicketView>(
        `${URL_BASE_V1}ticket/update/${ticketId}`,
        newTicket,
        loadHeader()
      )
      .pipe(catchError(handleError<TicketView>(null, this.alertService)));
  }

  asignarTicket(form: AsignarForm): Observable<TicketView> {
    return this.http
      .post<TicketView>(`${URL_BASE_V1}ticket/asignar`, form, loadHeader())
      .pipe(catchError(handleError<TicketView>(null, this.alertService)));
  }

  cerrarTicket(form: CerrarForm) {
    return this.http
      .post<TicketView>(`${URL_BASE_V1}ticket/cerrar`, form, loadHeader())
      .pipe(catchError(handleError<TicketView>(null, this.alertService)));
  }

  listUser(
    page: number,
    size: number = DEFAULT_PAGE_SIZE
  ): Observable<PageResponse<TicketHome[]>> {
    return this.http
      .get<PageResponse<TicketHome[]>>(
        `${URL_BASE_V1}ticket/user/home?page=${page}&size=${size}`,
        loadHeader()
      )
      .pipe(catchError(handleError<PageResponse<TicketHome[]>>(null)));
  }

  listByEstado(
    estado: number,
    page: number,
    size: number = DEFAULT_PAGE_SIZE
  ): Observable<PageResponse<TicketHome[]>> {
    return this.http
      .get<PageResponse<TicketHome[]>>(
        `${URL_BASE_V1}ticket/estado/${estado}?page=${page}&size=${size}`,
        loadHeader()
      )
      .pipe(catchError(handleError<PageResponse<TicketHome[]>>(null)));
  }

  listBySoporte(
    page: number,
    size: number = DEFAULT_PAGE_SIZE
  ): Observable<PageResponse<TicketHome[]>> {
    return this.http
      .get<PageResponse<TicketHome[]>>(
        `${URL_BASE_V1}ticket/soporte?page=${page}&size=${size}`,
        loadHeader()
      )
      .pipe(catchError(handleError<PageResponse<TicketHome[]>>(null)));
  }

  one(ticketId: number): Observable<TicketView> {
    return this.http
      .get<TicketView>(`${URL_BASE_V1}ticket/${ticketId}`, loadHeader())
      .pipe(catchError(handleError<TicketView>(null)));
  }
}
