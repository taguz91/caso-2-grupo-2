import { Component, OnInit } from '@angular/core';
import { Parametro } from 'src/app/models/Parametros';
import { ParametrosService } from 'src/app/services/parametros.service';

@Component({
  selector: 'app-tipo-servicio',
  templateUrl: './tipo-servicio.component.html',
  styleUrls: ['./tipo-servicio.component.scss'],
})
export class TipoServicioComponent implements OnInit {
  tiposServicios: Parametro[] = [];

  constructor(private parametroService: ParametrosService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.parametroService.listTipoServicios().subscribe((response) => {
      this.tiposServicios = response;
    });
  }
}
