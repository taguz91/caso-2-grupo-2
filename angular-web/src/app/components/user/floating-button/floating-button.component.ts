import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss'],
})
export class FloatingButtonComponent implements OnInit {
  @Input() show: boolean = true;
  @Input() icon: string = '';
  @Input() url: string;
  @Input() tooltip: string = '';

  constructor() {}

  ngOnInit(): void {}
}
