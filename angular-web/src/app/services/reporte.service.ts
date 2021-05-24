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

    const options = {
      background: 'white',
      scale: 3
    };

    html2canvas(DATA,options).then((canvas) => {
      var ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = false;
      this.img.src=('/assets/img/logo.png') ;
      pdf.addImage(this.img,'PNG',10,10,80,70);
      pdf.text(290, 50, 'Instituto Tecnologico Superior del Azuay');
      const img = canvas.toDataURL('image/JPEG');
      console.log(img);
      const bufferX = 15;
      const bufferY = 85;
      const imgProps = (pdf as any).getImageProperties(img);
      const pdfWidth = 800;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(img, 'JPEG',  bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'NONE');
      return pdf;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_TIRTEC.pdf`);
    });
  }
}
