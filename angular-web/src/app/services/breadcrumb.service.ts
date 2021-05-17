import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Breadcrumb } from '../models/types';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private routes = new Subject<Breadcrumb[]>();

  private default: Breadcrumb[] = [
    {
      label: 'Inicio',
      toUrl: '/admin',
    },
  ];

  constructor() {}

  addRutes(routes: Breadcrumb[]) {
    this.routes.next([...this.default, ...routes]);
  }

  getRoutes(): Observable<Breadcrumb[]> {
    return this.routes.asObservable();
  }
}
