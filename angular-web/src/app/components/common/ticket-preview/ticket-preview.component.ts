import { Component, Input, OnInit } from '@angular/core';
import { TicketHome } from 'src/app/models/ticket';

@Component({
  selector: 'app-ticket-preview',
  templateUrl: './ticket-preview.component.html',
  styleUrls: ['./ticket-preview.component.scss'],
})
export class TicketPreviewComponent implements OnInit {
  @Input() ticket: TicketHome;

  constructor() {}

  ngOnInit(): void {}
}
