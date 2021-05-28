import { Component, OnInit } from '@angular/core';
import { Encuesta } from 'src/app/models/encuesta';
import { EncuesatisService } from '../../../services/encuesatis.service';
import { DEFAULT_PAGE_METADA } from '../../../utils/constantes';
import { PageMetadata } from '../../../models/parametros';
import { EncuestaView } from '../../../models/encuesta';

@Component({
  selector: 'app-admin-encuestas',
  templateUrl: './admin-encuestas.component.html',
  styleUrls: ['./admin-encuestas.component.scss']
})
export class AdminEncuestasComponent implements OnInit {
  actualPage: number = 0;
  encuestasAll: EncuestaView[] = [];
  pageMetada: PageMetadata = DEFAULT_PAGE_METADA;

  constructor(public _encuestasService: EncuesatisService) { }

  ngOnInit(): void {
    this.mostrarActividades();
    console.log(this.encuestasAll)
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
        this.encuestasAll = response.data;
        console.log(response.data);
        this.pageMetada = response.meta;
      },
      error => {
        console.log(error);
      }
    )
  }
}
