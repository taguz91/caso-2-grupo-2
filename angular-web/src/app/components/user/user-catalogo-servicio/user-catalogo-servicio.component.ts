import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogoServicio, PageMetadata } from 'src/app/models/Parametros';
import { ParametrosService } from 'src/app/services/parametros.service';
import { DEFAULT_PAGE_METADA } from 'src/app/utils/constantes';

@Component({
  selector: 'app-user-catalogo-servicio',
  templateUrl: './user-catalogo-servicio.component.html',
  styleUrls: ['./user-catalogo-servicio.component.scss'],
})
export class UserCatalogoServicioComponent implements OnInit {
  catalogoServicios: CatalogoServicio[] = [];
  page: number = 0;
  pageMetada: PageMetadata = DEFAULT_PAGE_METADA;
  isLastpage: boolean = false;
  loading: boolean = true;

  private tipoServicio: number = 0;

  constructor(
    private parametroService: ParametrosService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('idTipo');
    if (id) {
      this.tipoServicio = parseInt(id);
      this.getCatalogo(this.tipoServicio);
    }
  }

  private getCatalogo(tipoServicio: number): void {
    this.parametroService
      .listCatalogoServicios(tipoServicio, this.page, 10)
      .subscribe((res) => {
        this.catalogoServicios.push(...res.data);
        this.isLastpage = res.meta.pages === this.page + 1;
        this.loading = false;
      });
  }

  loadMore() {
    this.loading = true;
    this.page++;
    this.getCatalogo(this.tipoServicio);
  }
}
