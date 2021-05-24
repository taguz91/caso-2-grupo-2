import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FloatingOption } from 'src/app/models/Parametros';

@Component({
  selector: 'app-list-floating-button',
  templateUrl: './list-floating-button.component.html',
  styleUrls: ['./list-floating-button.component.scss'],
})
export class ListFloatingButtonComponent implements OnInit {
  @Input() buttons: FloatingOption[] = [];

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  triggerModal(content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      modalDialogClass:
        ' modal-dialog-centered modal-dialog-scrollable modal-lg',
    }).result;
  }
}
