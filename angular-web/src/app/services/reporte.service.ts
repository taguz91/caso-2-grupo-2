import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { NgbCalendarGregorian } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  img =new Image();

  constructor() {}

  reporte(data : string) {
<<<<<<< HEAD
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
=======
    var DATA: any = document.getElementById(data);

    var pdf = new jsPDF('l', 'pt', 'a4');

    const options = {
      background: 'white',
      scale: 3
    };
    const dia= new NgbCalendarGregorian().getToday().day;
    const mes= new NgbCalendarGregorian().getToday().month;
    const year= new NgbCalendarGregorian().getToday().year;
    html2canvas(DATA,options).then((canvas) => {

      this.img.src=('/assets/img/logo.png') ;
      pdf.addImage(this.img,'PNG',10,10,80,70);
      pdf.text(290, 50, 'Instituto Tecnologico Superior del Azuay');
      pdf.text(700, 80,'Fecha: '+dia+'/'+mes+'/'+year);
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
>>>>>>> b0081a27b2f5999e399dec366e6fdfb340a9cbb3
  }
}
