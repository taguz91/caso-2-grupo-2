import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss'],
})
export class CatalogoComponent implements OnInit {
  catalogoId: number = 0;
  constructor(
    private modalService: NgbModal,
    private breadcrumb: BreadcrumbService
  ) {}

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
  }
}
