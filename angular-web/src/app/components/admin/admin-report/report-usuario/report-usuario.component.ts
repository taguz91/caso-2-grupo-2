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
  catalogoId: number = 0;
  catalogos: CatalogoView[] = [];
  catalogosExcel: CatalogoViewFull[] = [];
  pageMetada: PageMetadata = DEFAULT_PAGE_METADA;
  perPage: number = DEFAULT_PAGE_SIZE;
  actualPage: number = 0;

  values: any[] = [];
  get page() {
    return this.actualPage + 1;
  }
  set page(page: number) {
    this.actualPage = page - 1;
    this.loadCatalogos();
  }
  private loadCatalogos() {
    this.catalogoService.all(this.actualPage).subscribe((data) => {
      this.catalogos = data.data;
      this.catalogosExcel = data.data; 
      this.pageMetada = data.meta;
    });
  }

  private nuevosData(): any[] {
    const values:any[] = [];
    this.catalogosExcel.forEach((catalogo) => {
      values.push([
        catalogo.tipoServicio.nombre,
        catalogo.servicio.nombre_servicio,
        catalogo.descripcion,
        catalogo.sla.criticidad.nombre,
        catalogo.sla.impacto.nombre,
        catalogo.sla.nivelPrioridad.nombre,
        catalogo.sla.tiempoResolucion,
        catalogo.sla.tiempoRespuesta,
        catalogo.sla.reglasEscalada
      ]);
    });
    this.values.filter((values)=>'Bajo');
    return values;
  }

  constructor(private modalService: NgbModal,
    private breadcrumb: BreadcrumbService,
    private catalogoService: CatalogoService,
    private alertService: AlertService,
    private _reporte: ReporteService) { }

  ngOnInit(): void {
    this.breadcrumb.addRutes([
      {
        label: 'Catalogo',
        toUrl: '/admin/catalogo',
      },
    ]);
    this.loadCatalogos();
  }

  triggerModal(content) {
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        modalDialogClass:
          'modal-dialog-centered modal-dialog-scrollable modal-lg',
      })
      .result.then(
        (res) => {
          this.resetForm();
        },
        (res) => {
          this.resetForm();
        }
      );
  }

  private resetForm() {
    this.catalogoId = 0;
    this.loadCatalogos();
  }

  update(idCatalogo: number) {
    this.catalogoId = idCatalogo;
  }

  delete(idCatalogo: number) {
    this.catalogoService.delete(idCatalogo).subscribe((res) => {
      if (res > 0) {
        this.alertService.info(`Eliminamos correctamente #${res}`);
        this.loadCatalogos();
      }
    });
  }
  exportAsXLSX(){
    this.values=this.nuevosData();
    this._reporte.exportToExcel(this.values,'ExportEvaluate');
  }

}
