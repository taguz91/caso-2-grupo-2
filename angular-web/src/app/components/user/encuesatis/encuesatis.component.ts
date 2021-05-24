import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Criticidad } from 'src/app/models/criticidad';
import { Encuesta } from 'src/app/models/encuesta';
import { CriticidadService } from 'src/app/services/criticidad.service';
import { EncuesatisService } from 'src/app/services/encuesatis.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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
  public critiAll : Criticidad[]=[];
  constructor(
    public encuestaservice: EncuesatisService,
    private activeRoute: ActivatedRoute,
    private _router: Router,
    private criticidadService: CriticidadService,
    private _reporte: ReporteService
  ) {}

  ngOnInit(): void {
    const Id = this.activeRoute.snapshot.paramMap.get('idTicket');
    if (Id) {
      this.ticketId = parseInt(Id);
    }

    this.getAllCriti();

  }

  califica(item): void {
    console.log(item);
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
    console.log(this.encuestaCreate);
    this.encuestaCreate.ticketid = this.ticketId;
    this.encuestaservice.registerEncuesta(this.encuestaCreate).subscribe(
      (res) => {
        console.log(res);
        this.limpiar();
        this._router.navigate(['/user/home']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  limpiar(): void {
    this.encuestaCreate= new Encuesta(0,"",0);
    this.contador=0;
    for (let i = 0; i < 5; i++) {
      let b = i + 1;
        document.getElementById(b + 'estrella').style.color = 'black';
    }
  }

  getAllCriti(): void {
    this.criticidadService.getAllCriticidad().subscribe(
      res => {
        this.critiAll = res;
      },
      err => {
        console.log(err)
      }
    )
  }

  downloadPDF() {
    // Extraemos el
    const DATA: any = document.getElementById('tablaCriti');
    const doc = new jsPDF('l', 'mm', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_TDS.pdf`);
    });
  }
}
