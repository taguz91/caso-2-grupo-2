import { Component, OnInit } from '@angular/core';
import { Encuesta, EncuestaView } from '../../../models/encuesta';
import { PageMetadata } from '../../../models/parametros';
import { DEFAULT_PAGE_METADA } from '../../../utils/constantes';
import { EncuesatisService } from '../../../services/encuesatis.service';
import { ReporteService } from 'src/app/services/reporte.service';

@Component({
  selector: 'app-admin-encuesta',
  templateUrl: './admin-encuesta.component.html',
  styleUrls: ['./admin-encuesta.component.scss']
})
export class AdminEncuestaComponent implements OnInit {

  actualPage: number = 0;
  encuestasAl: EncuestaView[] = [];
  pageMetada: PageMetadata = DEFAULT_PAGE_METADA;
  values: any[] = [];
  constructor(public _encuestasService: EncuesatisService, public _reporte: ReporteService) { }

  ngOnInit(): void {
    this.mostrarActividades();
    console.log(this.encuestasAl)
  }
  get page() {
    return this.actualPage + 1;
  }

  set page(page: number) {
    this.actualPage = page - 1;
    this.mostrarActividades();
  }

  mostrarActividades(): void {
    this._encuestasService.listEncuestas(this.actualPage).subscribe(
      (response) => {
        this.encuestasAl= response.data;
        console.log(response.data);
        this.pageMetada = response.meta;
        this.values = this.nuevosData();

      },
      error => {
        console.log(error);
      }
    )
  }

  private nuevosData(): any[] {
    const values:any= [];
    console.log(values)
    this.encuestasAl.forEach((encuesta) => {
      values.push([
        encuesta.comentario,
        encuesta.calificacion,
        encuesta.usuario.correo,
        encuesta.usuario.nombreCompleto,
        encuesta.usuario.telefono
      ])
    });
    return values;
  }

  GetReporte(){
    this._reporte.reporte('tr');
  }
}

