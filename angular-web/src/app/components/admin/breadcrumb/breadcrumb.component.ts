import { Component, OnInit } from '@angular/core';
import { Breadcrumb } from 'src/app/models/types';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  routes: Breadcrumb[] = [];

  constructor(private breadcrumb: BreadcrumbService) {}

  ngOnInit(): void {
    this.loadRoutes();
  }

  private loadRoutes() {
    this.breadcrumb.getRoutes().subscribe((routes) => (this.routes = routes));
  }
}
