import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogoServicio } from 'src/app/models/Parametros';
import { ParametrosService } from 'src/app/services/parametros.service';

@Component({
  selector: 'app-user-catalogo-servicio',
  templateUrl: './user-catalogo-servicio.component.html',
  styleUrls: ['./user-catalogo-servicio.component.scss'],
})
export class UserCatalogoServicioComponent implements OnInit {
  catalogoServicios: CatalogoServicio[] = [];

  constructor(
    private parametroService: ParametrosService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('idTipo');
    if (id) {
      this.getCatalogo(parseInt(id));
    }
  }

  private getCatalogo(tipoServicio: number): void {
    this.parametroService
      .listCatalogoServicios(tipoServicio)
      .subscribe((res) => (this.catalogoServicios = res.data));
  }
}
