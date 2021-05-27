import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { NgbCalendarGregorian } from '@ng-bootstrap/ng-bootstrap';
import {saveAs} from 'file-saver';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const _EXCEL_tipe =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';

const _EXCEL_EXT = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  img = new Image();
  constructor() { }
  reporte(data: string) {
    var DATA: any = document.getElementById(data);

    var pdf = new jsPDF('l', 'pt', 'a4');

    const options = {
      background: 'white',
      scale: 3
    };
    const dia = new NgbCalendarGregorian().getToday().day;
    const mes = new NgbCalendarGregorian().getToday().month;
    const year = new NgbCalendarGregorian().getToday().year;
    html2canvas(DATA, options).then((canvas) => {

      this.img.src = ('/assets/img/logo.png');
      pdf.addImage(this.img, 'PNG', 10, 10, 80, 70);
      pdf.text(290, 50, 'Instituto Tecnologico Superior del Azuay');
      pdf.text(700, 80, 'Fecha: ' + dia + '/' + mes + '/' + year);
      const img = canvas.toDataURL('image/JPEG');
      console.log(img);
      const bufferX = 15;
      const bufferY = 85;
      const imgProps = (pdf as any).getImageProperties(img);
      const pdfWidth = 800;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(img, 'JPEG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'NONE');
      return pdf;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_TIRTEC.pdf`);
    });
  }

  exportToExcel(json: any, excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data']
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcel(excelBuffer,excelFileName);
  }

  private saveAsExcel(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: _EXCEL_tipe });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + _EXCEL_EXT);
  }

}
