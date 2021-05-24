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

    var pdf = new jsPDF('l', 'pt', 'a4');

    html2canvas(DATA).then((canvas) => {
      this.img.src=('/assets/img/logo.png') ;
      pdf.addImage(this.img,'PNG',10,10,80,70);
      pdf.text(290, 50, 'Instituto Tecnologico Superior del Azuay');
      const img = canvas.toDataURL('image/PNG');
      console.log(img);
      const bufferX = 15;
      const bufferY = 85;
      const imgProps = (pdf as any).getImageProperties(img);
      const pdfWidth = 800;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(img, 'PNG',  bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'SLOW');
      return pdf;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_TIRTEC.pdf`);
    });
  }
}
