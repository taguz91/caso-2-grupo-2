import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.scss']
})
export class AdminReportComponent implements OnInit {
  constructor() {  }
  
 ngOnInit(): void {
    
  }
 
  valueBook: number=0;

  pages(item):void{
    this.valueBook=item;
    console.log(this.valueBook);
  }
}
