import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-registro-ticket',
  templateUrl: './header-registro-ticket.component.html',
  styleUrls: ['./header-registro-ticket.component.scss'],
})
export class HeaderRegistroTicketComponent implements OnInit {
  @Input()
  active: number = 0;

  circles: number[] = Array(5).fill(1);

  constructor() {}

  ngOnInit(): void {}
}
