import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Adjunto } from 'src/app/models/adjunto';
import { FloatingOption } from 'src/app/models/Parametros';
import { TicketView } from 'src/app/models/ticket';
import { AdjuntoService } from 'src/app/services/adjunto.service';
import { AlertService } from 'src/app/services/alert.service';
import { SessionService } from 'src/app/services/session.service';
import { TicketService } from 'src/app/services/ticket.service';
import {
  ROL_DEVELOPER,
  ROL_SOPORTE_N2,
  ROL_USUARIO,
  TICKET_ESTADO_CERRADO_CON_SOLUCION,
  TICKET_ESTADO_CERRADO_SIN_SOLUCION,
} from 'src/app/utils/constantes';

@Component({
  selector: 'app-user-ticket',
  templateUrl: './user-ticket.component.html',
  styleUrls: ['./user-ticket.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserTicketComponent implements OnInit {
  @Input() ticketId: number = 0;

  // Templates
  @ViewChild('modalAsignar')
  private modalAsignar: TemplateRef<any>;

  @ViewChild('modalCerrar')
  private modalCerrar: TemplateRef<any>;

  ticket: TicketView;
  urlEdit: string = '';
  urlEncuesta: string = '';
  isOpen: boolean = true;
  isClosed: boolean = false;
  showUser: Boolean = false;
  closeModal: string;
  adjuntos: Adjunto[];
  floatingButtons: FloatingOption[] = [];

  constructor(
    private ticketService: TicketService,
    private activeRoute: ActivatedRoute,
    private modalService: NgbModal,
    private adjuntoService: AdjuntoService,
    private alertService: AlertService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('idTicket');
    if (id) {
      this.ticketId = parseInt(id);
      this.findOne();
    }
  }

  private checkAccess() {
    const user = this.sessionService.user;
    this.sessionService.getUser().subscribe((_) => this.checkAccess());
    if (user) {
      this.isOpen = this.isOpen && this.sessionService.isFinalUser();
      this.isClosed = this.isClosed && this.sessionService.isFinalUser();
      this.showUser = this.sessionService.isPersonal();
    }
  }

  findOne() {
    this.ticketService.one(this.ticketId).subscribe((res) => {
      this.ticket = res;
      this.urlEdit = `/user/ticket/ingreso/${this.ticket.catalogo.catalogo_id}/${this.ticket.ticket_id}`;
      this.urlEncuesta = `/user/encuesta/${this.ticket.ticket_id}`;
      this.isOpen = ![
        TICKET_ESTADO_CERRADO_SIN_SOLUCION,
        TICKET_ESTADO_CERRADO_CON_SOLUCION,
      ].includes(this.ticket.estado.parametros_id);
      this.isClosed =
        TICKET_ESTADO_CERRADO_CON_SOLUCION === this.ticket.estado.parametros_id;

      this.adjuntos = res.adjuntos;
      // Vemos si esta habilitado el boton de asignar
      this.addFloatingButtons();

      this.checkAccess();
    });
  }

  private addFloatingButtons() {
    if (this.ticket.responsable && this.sessionService.isSoporte()) {
      this.floatingButtons.push({
        icon: 'task',
        tooltip: 'Cerrar ticket',
        callback: () => this.triggerModal(this.modalCerrar),
      });
    }

    if (
      this.ticket?.responsable?.rol.rolId !== ROL_SOPORTE_N2 &&
      this.sessionService.isPersonal()
    ) {
      this.floatingButtons.push({
        icon: 'contacts',
        tooltip: 'Asignar ticket',
        callback: () => this.triggerModal(this.modalAsignar),
      });
    }
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
