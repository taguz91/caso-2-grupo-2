import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PageResponse } from '../models/Parametros';
import { TicketForm, TicketHome, TicketView } from '../models/ticket';
import {
  DEFAULT_PAGE_SIZE,
  handleError,
  loadHeader,
  URL_BASE_V1,
} from '../utils/constantes';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private http: HttpClient) {}

  registerTicket(newTicket: TicketForm): Observable<any> {
    return this.http
      .post<any>(`${URL_BASE_V1}ticket/save`, newTicket, loadHeader())
      .pipe(catchError(handleError<any>(null)));
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

  one(ticketId: number): Observable<TicketView> {
    return this.http
      .get<TicketView>(`${URL_BASE_V1}ticket/${ticketId}`, loadHeader())
      .pipe(catchError(handleError<TicketView>(null)));
  }
}
