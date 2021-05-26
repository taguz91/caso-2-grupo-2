import { Injectable, Optional } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor() { }

  reporte(data : string) {
  //   var DATA: any = document.getElementById(data);
  //   var doc = new jsPDF(
  //     {
  //       orientation: '1',
  //       unit: 'pt',
  //       format: 'A4',
  //       position:'2'
  //     }
  //   );
  //   doc.setFontSize(22);
  //   doc.setFontStyle('cursiva');
  //   doc.text("Instituto Tecnologico Superior del Azuay", 180,20);
  //   doc.fromHTML(DATA,10,25);
  //   doc.save("IstaReporte.pdf");
  // }
  }
}
