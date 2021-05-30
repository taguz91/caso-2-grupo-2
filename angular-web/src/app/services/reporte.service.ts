import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { NgbCalendarGregorian } from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const _EXCEL_tipe =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';

const _EXCEL_EXT = '.xlsx';

@Injectable({
  providedIn: 'root',
})

//Reporte PDF VERSION 1.5
export class ReporteService {
  img = new Image();
  constructor() {}
  reporte(datas: string) {
    if (screen.width < 1024) {
      document
        .getElementById('viewport')
        .setAttribute('content', 'width=1200px');
    }
    const data = document.getElementById(datas);
    const dia = new NgbCalendarGregorian().getToday().day;
    const mes = new NgbCalendarGregorian().getToday().month;
    const year = new NgbCalendarGregorian().getToday().year;

    const fecha="dia mes"
    let html2canvasOptions = {
      allowTaint: true,
      removeContainer: true,
      backgroundColor: null,
      imageTimeout: 15000,
      logging: true,
      scale: 2,
      useCORS: true,
    };
    html2canvas(data, html2canvasOptions).then((canvas) => {
      const contentDataURL = canvas.toDataURL('image/png');
      const imgWidth = 277;
      const pageHeight = 265;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let pdf = new jsPDF('l', 'mm', 'a4', true); // A4 size page of PDF
      this.img.src = '/assets/img/logo.png';
        pdf.addImage(this.img, 'PNG', 5, 5, 22, 21);
        pdf.text(100, 15, 'Instituto Tecnologico Superior del Azuay');
        pdf.text(250, 27, 'Fecha: ' + dia + '/' + mes + '/' + year);
        const img = canvas.toDataURL('image/JPEG');
      let position = 30;
      pdf.addImage(
        contentDataURL,
        'PNG',
        10,
        position,
        imgWidth,
        imgHeight,
        undefined,
        'FAST'
      );
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(
          contentDataURL,
          'PNG',
          10,
          position,
          imgWidth,
          imgHeight,
          undefined,
          'FAST'
        );
        heightLeft -= pageHeight;
      }
      pdf.save('TIRTEC_Reporte.pdf'); // Generated PDF

      if (screen.width < 1024) {
        document
          .getElementById('viewport')
          .setAttribute('content', 'width=device-width, initial-scale=1');
      }
    });
  }
//Reporte XLSX version.1
  exportToExcel(json: any, excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcel(excelBuffer, excelFileName);
  }

  private saveAsExcel(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: _EXCEL_tipe });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + _EXCEL_EXT
    );
  }

  //Reporte PDF TEST
  reporteTabla(datas: string) {
    if (screen.width < 1024) {
      document
        .getElementById('viewport')
        .setAttribute('content', 'width=1200px');
    }
    const data = document.getElementById(datas);
    const dia = new NgbCalendarGregorian().getToday().day;
    const mes = new NgbCalendarGregorian().getToday().month;
    const year = new NgbCalendarGregorian().getToday().year;
    let html2canvasOptions = {
      allowTaint: true,
      removeContainer: true,
      backgroundColor: null,
      imageTimeout: 15000,
      logging: true,
      scale: 2,
      useCORS: true,
    };
    html2canvas(data, html2canvasOptions).then((canvas) => {
      const contentDataURL = canvas.toDataURL('image/png');
      const imgWidth = 180;
      const pageHeight = 265;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let pdf = new jsPDF('p', 'mm', 'a4', true); // A4 size page of PDF
      this.img.src = '/assets/img/logo.png';
        pdf.addImage(this.img, 'PNG', 5, 5, 22, 21);
        pdf.text(60, 15, 'Instituto Tecnologico Superior del Azuay');
        pdf.text(700, 80, 'Fecha: ' + dia + '/' + mes + '/' + year);
        const img = canvas.toDataURL('image/JPEG');
      let position = 30;
      pdf.addImage(
        contentDataURL,
        'PNG',
        15,
        position,
        imgWidth,
        imgHeight,
        undefined,
        'FAST'
      );
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(
          contentDataURL,
          'PNG',
          15,
          position,
          imgWidth,
          imgHeight,
          undefined,
          'FAST'
        );
        heightLeft -= pageHeight;
      }
      pdf.save('resume.pdf'); // Generated PDF

      if (screen.width < 1024) {
        document
          .getElementById('viewport')
          .setAttribute('content', 'width=device-width, initial-scale=1');
      }
    });
  }
  // Few necessary setting options
}
