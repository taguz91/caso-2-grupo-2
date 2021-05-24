import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CatalogoView } from 'src/app/models/catalogo';
import { PageMetadata } from 'src/app/models/Parametros';
import { AlertService } from 'src/app/services/alert.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { DEFAULT_PAGE_METADA } from 'src/app/utils/constantes';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss'],
})
export class CatalogoComponent implements OnInit {
  catalogoId: number = 0;
  catalogos: CatalogoView[] = [];
  pageMetada: PageMetadata = DEFAULT_PAGE_METADA;

  actualPage: number = 0;

  constructor(
    private modalService: NgbModal,
    private breadcrumb: BreadcrumbService,
    private catalogoService: CatalogoService,
    private alertService: AlertService
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
}
