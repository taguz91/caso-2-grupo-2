import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Parametro } from 'src/app/models/Parametros';
import { ParametrosService } from 'src/app/services/parametros.service';

@Component({
  selector: 'app-tipo-servicio',
  templateUrl: './tipo-servicio.component.html',
  styleUrls: ['./tipo-servicio.component.scss'],
})
export class TipoServicioComponent implements OnInit {
  private idPersona: number = 0;
  tiposServicios: Parametro[] = [];

  constructor(
    private parametroService: ParametrosService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idPersona = this.activeRoute.snapshot.paramMap.get('idPersona');
    if (idPersona) {
      this.idPersona = parseInt(idPersona);
    }
    this.getUsers();
  }

  private getUsers(): void {
    this.parametroService.listTipoServicios().subscribe((response) => {
      this.tiposServicios = response;
    });
  }

  redirectUrl(tipo: Parametro): string {
    if (this.idPersona !== 0) {
      return `/dashboard/ticket/servicios/${this.idPersona}/${tipo.parametros_id}`;
    }
    return `/user/ticket/servicios/${tipo.parametros_id}`;
  }
}
