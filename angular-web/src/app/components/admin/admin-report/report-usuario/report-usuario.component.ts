import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CatalogoView, CatalogoViewFull } from 'src/app/models/catalogo';
import { PageMetadata } from 'src/app/models/Parametros';
import { AlertService } from 'src/app/services/alert.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { ReporteService } from 'src/app/services/reporte.service';
import { DEFAULT_PAGE_METADA, DEFAULT_PAGE_SIZE } from 'src/app/utils/constantes';

@Component({
  selector: 'app-report-usuario',
  templateUrl: './report-usuario.component.html',
  styleUrls: ['./report-usuario.component.scss']
})
export class ReportUsuarioComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
 
  }


}
