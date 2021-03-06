import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Criticidad } from 'src/app/models/criticidad';
import { Encuesta } from 'src/app/models/encuesta';
import { CriticidadService } from 'src/app/services/criticidad.service';
import { EncuesatisService } from 'src/app/services/encuesatis.service';
import { ReporteService } from 'src/app/services/reporte.service';
@Component({
  selector: 'app-encuesatis',
  templateUrl: './encuesatis.component.html',
  styleUrls: ['./encuesatis.component.scss'],
})
export class EncuesatisComponent implements OnInit {
  public idReporte: string;
  public contador: number;
  public ticketId: number = 0;
  public encuestaCreate: Encuesta = new Encuesta(0, '', 0);
  public critiAll: Criticidad[] = [];
  constructor(
    public encuestaservice: EncuesatisService,
    private activeRoute: ActivatedRoute,
    private _router: Router,
    private criticidadService: CriticidadService,
    private _reporte: ReporteService
  ) {}

  ngOnInit(): void {
    this.getAllCriti();
  }

  califica(item): void {
    this.contador = item;
    this.encuestaCreate.calificacion = this.contador;
    for (let i = 0; i < 5; i++) {
      let b = i + 1;
      if (i < this.contador) {
        document.getElementById(b + 'estrella').style.color = 'orange';
      } else {
        document.getElementById(b + 'estrella').style.color = 'black';
      }
    }
  }
  addEncuesta(): void {
    const Id = this.activeRoute.snapshot.paramMap.get('idTicket');
    if (Id) {
      this.ticketId = parseInt(Id);
    }
    this.encuestaCreate.ticketid = this.ticketId;
    this.encuestaservice.registerEncuesta(this.encuestaCreate).subscribe(
      (res) => {
        this._router.navigate(['/user/home']);
        this.limpiar();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  limpiar(): void {
    this.encuestaCreate = new Encuesta(0, '', 0);
    this.contador = 0;
    for (let i = 0; i < 5; i++) {
      let b = i + 1;
      document.getElementById(b + 'estrella').style.color = 'black';
    }
  }

  getAllCriti(): void {
    this.criticidadService.getAllCriticidad().subscribe(
      (res) => {
        this.critiAll = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  downloadPDF() {
    this._reporte.reporte('tablaCriti');
  }
}
