import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  img =new Image();

  constructor() {}

  reporte(data : string) {
    var DATA: any = document.getElementById(data);

    var pdf = new jsPDF({
      orientation: 'l',
      unit :'pt',
      format: 'A4',
      position:2
    });
    this.img.src=('/assets/img/logo.png') ;
    pdf.addImage(this.img,'PNG',10,10,80,70);
    pdf.text(290, 50, 'Instituto Tecnologico Superior del Azuay');
    pdf.fromHTML(DATA,60,100);
    pdf.setFontSize(10);
    pdf.setFont("",10);
    pdf.save("mensahe.pdf");
    /*const DATA: any = document.getElementById(data);
    const doc = new jsPDF('p', 'pt', 'a4');
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
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, 'Slow', 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_TDS.pdf`);
    });*/
  }
}
