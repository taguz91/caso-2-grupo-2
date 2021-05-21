import { Component, OnInit } from '@angular/core';

import { Categoria } from '../../../models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: 'app-categoria-register',
  templateUrl: './categoria-register.component.html',
  styleUrls: ['./categoria-register.component.scss']
})

export class CategoriaRegisterComponent implements OnInit {

  categoriaForm = new FormGroup({
    nombre_categoria: new FormControl('', Validators.required)
  })

  categoriaFormEdit = new FormGroup({
    nombre_categoria: new FormControl('', Validators.required),
    categoria_id: new FormControl()
  })

  public existsData: boolean;
  isShow: boolean = false;
  messageError: any;
  listaCategoria: Categoria[];
  hasError: boolean;
  listaErrores: any[];

  constructor(private categoriaService: CategoriaService, public modal:NgbModal, private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.listarCategorias();
  }

  

  listarCategorias(){
    this.categoriaService.listCategorias().subscribe(data => {
      if(data != null){
        this.listaCategoria = data['data']
        this.existsData = true;
      } else {
        this.existsData = false;
      } 
    });
  }

  addCategoria(form: Categoria){
      this.categoriaService.addCategoria(form)
    .subscribe(res => {
      console.log("Categoria guardada ", res);
      this.listarCategorias();
      this.isShow = !this.isShow;
      this.alertService.success("Categoria Registrada");
    }, (err: HttpErrorResponse) => {
      this.hasError = true;
       console.log(err.error.errors.nombre_categoria);
       this.listaErrores = err.error.errors.nombre_categoria;
       this.listaErrores.map(error => {
         this.messageError = error
       })
    }) 
    
  }

  openModal(contenido, id, nombre_categoria){
    console.log(contenido);
    console.log(id);
    console.log(nombre_categoria);
    this.categoriaFormEdit.setValue({
      nombre_categoria: nombre_categoria,
      categoria_id: id
    });
    this.modal.open(contenido);
  }

  actualizarCategoria(form: Categoria){
    this.categoriaService.updateCategoria(form.categoria_id, form)
    .subscribe(res => {
      console.log("Categoria # ", form.categoria_id, " Actualizada -> ", form);
      console.log(res);
      this.alertService.success("Se actualizo la categoria");
      this.listarCategorias();
      this.modal.dismissAll();
    }, (err: HttpErrorResponse) => {
      this.hasError = true;
       console.log(err.error.errors.nombre_categoria);
       this.listaErrores = err.error.errors.nombre_categoria;
       this.listaErrores.map(error => {
         this.messageError = error
       })
    })
  }

  eliminarCategoria(id: any){
    this.categoriaService.deleteCategoria(id)
    .subscribe(res => {
      console.log(res);
      console.log('Categoria # ', id, " Eliminada");
      this.alertService.success("Se elimino la categoria");
      this.listarCategorias();
    }, (err: HttpErrorResponse) => {
        
    })
  }

  mostrarRegistroCategoria():void{
    this.isShow = !this.isShow;
  }
}
