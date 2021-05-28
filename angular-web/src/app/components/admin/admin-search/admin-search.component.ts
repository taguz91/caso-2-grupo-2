import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-search',
  templateUrl: './admin-search.component.html',
  styleUrls: ['./admin-search.component.scss'],
})
export class AdminSearchComponent implements OnInit {
  @Input() loading: boolean = false;
  @Output() onSeach: EventEmitter<string> = new EventEmitter();

  searchForm = new FormGroup({
    search: new FormControl('', [Validators.minLength(3)]),
  });

  constructor() {}

  ngOnInit(): void {}

  onFind() {
    if (!this.searchForm.valid) return;
    this.onSeach.emit(this.search.value);
  }

  get search() {
    return this.searchForm.get('search');
  }
}
