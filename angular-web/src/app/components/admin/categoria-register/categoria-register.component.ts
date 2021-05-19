import { Component, OnInit } from '@angular/core';

import { Categoria } from '../../../models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-categoria-register',
  templateUrl: './categoria-register.component.html',
  styleUrls: ['./categoria-register.component.scss']
})
export class CategoriaRegisterComponent implements OnInit {

  hasError: boolean = false;
  existsData: boolean;
  isShow: boolean = false;
  messageError: any [];
  listaCategoria: Categoria[];
  categoria: Categoria;

  formCategoria: FormGroup;

  constructor(private categoriaService: CategoriaService, private router: Router, public fb:FormBuilder) {
    this.formCategoria = this.fb.group({
      nombre_categoria: ["", Validators.required]
    })
  }

  ngOnInit(): void {
    this.categoriaService.listCategorias().subscribe(data => {
      if(data != null){
        this.listaCategoria = data['data']
        this.existsData = true;
      } else {
        this.existsData = false;
      } 
    });
  }

  addCategoria(){ 
    this.categoria = this.formCategoria.value;
    console.log(this.categoria);
    this.categoriaService.addCategoria(this.categoria)
    .subscribe(data => {
      console.log(data);
    }, (err) => {
       
    }) 
  }

  mostrarRegistroCategoria():void{
    this.isShow = !this.isShow;
  }
}
