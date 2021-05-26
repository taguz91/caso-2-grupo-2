import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CatalogoView } from 'src/app/models/catalogo';
import { PageMetadata } from 'src/app/models/Parametros';
import { AlertService } from 'src/app/services/alert.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { ReporteService } from 'src/app/services/reporte.service';
import {
  DEFAULT_PAGE_METADA,
  DEFAULT_PAGE_SIZE,
} from 'src/app/utils/constantes';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss'],
})
export class CatalogoComponent implements OnInit {
  catalogoId: number = 0;
  catalogos: CatalogoView[] = [];
  pageMetada: PageMetadata = DEFAULT_PAGE_METADA;
  perPage: number = DEFAULT_PAGE_SIZE;
  actualPage: number = 0;
  get page() {
    return this.actualPage + 1;
  }

  set page(page: number) {
    this.actualPage = page - 1;
    this.loadCatalogos();
  }

  constructor(
    private modalService: NgbModal,
    private breadcrumb: BreadcrumbService,
    private catalogoService: CatalogoService,
    private alertService: AlertService,
    private _reporte: ReporteService
  ) {
    this.loadCatalogos();
  }

  private loadCatalogos() {
    this.catalogoService.all(this.actualPage).subscribe((data) => {
      this.catalogos = data.data;
      this.pageMetada = data.meta;
    });
  }

  ngOnInit(): void {
    this.breadcrumb.addRutes([
      {
        label: 'Catalogo',
        toUrl: '/admin/catalogo',
      },
    ]);
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
  GetReporte(){
    this._reporte.reporte('catalogo');
  }
}
