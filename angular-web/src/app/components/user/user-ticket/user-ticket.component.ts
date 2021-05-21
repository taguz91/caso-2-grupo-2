import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Adjunto } from 'src/app/models/adjunto';
import { TicketView } from 'src/app/models/ticket';
import { AdjuntoService } from 'src/app/services/adjunto.service';
import { AlertService } from 'src/app/services/alert.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-user-ticket',
  templateUrl: './user-ticket.component.html',
  styleUrls: ['./user-ticket.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserTicketComponent implements OnInit {
  private ticketId: number = 0;
  ticket: TicketView;
  urlEdit: string = '';
  isOpen: boolean = true;
  closeModal: string;
  adjuntos: Adjunto[];

  constructor(
    private ticketService: TicketService,
    private activeRoute: ActivatedRoute,
    private modalService: NgbModal,
    private adjuntoService: AdjuntoService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('idTicket');
    if (id) {
      this.ticketId = parseInt(id);
      this.findOne();
    }
  }

  findOne() {
    this.ticketService.one(this.ticketId).subscribe((res) => {
      this.ticket = res;
      this.urlEdit = `/user/ticket/ingreso/${this.ticket.catalogo.catalogo_id}/${this.ticket.ticket_id}`;
      this.isOpen = ![13, 14].includes(this.ticket.estado.parametros_id);
      this.adjuntos = res.adjuntos;
    });
  }

  triggerModal(content) {
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        modalDialogClass:
          ' modal-dialog-centered modal-dialog-scrollable modal-lg',
      })
      .result.then(
        (res) => {
          this.closeModal = `Closed with: ${res}`;
        },
        (res) => {
          this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  deleteAdjunto(adjunto: Adjunto) {
    this.adjuntoService.deleteFile(adjunto.adjunto_id).subscribe((_) => {
      this.alertService.success('Eliminamos correctamente el adjunto.');
      this.adjuntos.splice(this.adjuntos.indexOf(adjunto), 1);
    });
  }
}
