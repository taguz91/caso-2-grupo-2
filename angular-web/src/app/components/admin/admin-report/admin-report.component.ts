import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../services/breadcrumb.service';
@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.scss']
})
export class AdminReportComponent implements OnInit {
  constructor(private breadcrumb : BreadcrumbService) {  }

 ngOnInit(): void {
  this.breadcrumb.addRutes([
    {
      label: 'Reporte',
      toUrl: 'admin/reportes/admin-report',
    },
  ]);
  }

  valueBook: number=1;
  pages(item):void{
    this.valueBook=item;
    console.log(this.valueBook);
  }
}
