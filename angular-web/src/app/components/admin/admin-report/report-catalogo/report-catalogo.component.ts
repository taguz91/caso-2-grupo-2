import { Component, OnInit } from '@angular/core';
import { CatalogoView, CatalogoViewFull } from 'src/app/models/catalogo';
import { PageMetadata } from 'src/app/models/Parametros';
import { DEFAULT_PAGE_METADA } from 'src/app/utils/constantes';
import { DEFAULT_PAGE_SIZE } from '../../../../utils/constantes';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { CatalogoService } from '../../../../services/catalogo.service';
import { AlertService } from '../../../../services/alert.service';
import { ReporteService } from '../../../../services/reporte.service';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-report-catalogo',
  templateUrl: './report-catalogo.component.html',
  styleUrls: ['./report-catalogo.component.scss']
})
export class ReportCatalogoComponent implements OnInit,PipeTransform {
  filterpost='';
  catalogoId: number = 0;
  catalogos: CatalogoView[] = [];
  catalogosExcel: CatalogoViewFull[] = [];
  pageMetada: PageMetadata = DEFAULT_PAGE_METADA;
  perPage: number = DEFAULT_PAGE_SIZE;
  actualPage: number = 0;
  values: any[] = [];
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
      this.pageMetada = data.meta;
      this.values=this.nuevosData();
    });
  }

  private nuevosData(): any[] {
    
    const values:any[] = [['Tipo de servicio','Servicio','Catalogo','Criticidad','Impacto','Nivel Prioridad','Tiempo Resolucion','Tiempo Respuesta','Tiempo Escalada']];
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
    return values;
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
  GetReporte(){
    this._reporte.reporte('tabla');
  }
  exportAsXLSX(){
    this.catalogosExcel=this.transform(this.catalogos,this.filterpost);
    this.values=this.nuevosData();
    this._reporte.exportToExcel(this.values,'ExportEvaluate');
  }
  resultPosts: any = [];
  transform(value: any, args: any): any {
    for(const post of value){
      if((post.tipoServicio.nombre.toLowerCase().indexOf(args.toLowerCase()) > -1) 
      || 
      (post.descripcion.toLowerCase().indexOf(args.toLowerCase()) > -1)
      || 
      (post.servicio.nombre_servicio.toLowerCase().indexOf(args.toLowerCase()) > -1)
      || 
      (post.sla.criticidad.nombre.toLowerCase().indexOf(args.toLowerCase()) > -1)
      || 
      (post.sla.impacto.nombre.toLowerCase().indexOf(args.toLowerCase()) > -1)
      || 
      (post.sla.nivelPrioridad.nombre.toLowerCase().indexOf(args.toLowerCase()) > -1)
      || 
      (post.sla.tiempoResolucion.toLowerCase().indexOf(args.toLowerCase()) > -1)
      || 
      (post.sla.tiempoRespuesta.toLowerCase().indexOf(args.toLowerCase()) > -1)
      ||
      (post.sla.reglasEscalada.toLowerCase().indexOf(args.toLowerCase()) > -1)
      ){
         this.resultPosts.push(post);
      }
    };
    
    return this.resultPosts;
  }
}
