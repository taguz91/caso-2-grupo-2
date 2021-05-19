import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
<<<<<<< HEAD


  constructor() { }

  ngOnInit(): void {
    
  }


=======
  constructor(private breadcrumb: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumb.addRutes([]);
  }
>>>>>>> d13e952ec32e47d1ba0c739f016fd564172ee741
}
