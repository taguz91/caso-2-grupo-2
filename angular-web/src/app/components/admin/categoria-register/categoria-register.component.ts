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

  public existsData: boolean;
  isShow: boolean = false;
  messageError: any;
  listaCategoria: Categoria[];
  hasError: boolean;
  listaErrores: any[];
  page = 0;
  size = 10;
  items: number;
  pages: number;

  categoriaForm = new FormGroup({
    nombre_categoria: new FormControl('', Validators.required)
  })

  categoriaFormEdit = new FormGroup({
    nombre_categoria: new FormControl('', Validators.required),
    categoria_id: new FormControl()
  })

  constructor(private categoriaService: CategoriaService, public modal: NgbModal, private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.listarCategorias();
  }



  listarCategorias() {
    this.categoriaService.listCategorias(this.page, this.size).subscribe(data => {
      if (data != null) {
        console.log(data);
        this.listaCategoria = data['data']
        this.existsData = true;
        this.page = data.meta.current;
        this.items = data.meta.items;
        this.pages = data.meta.pages;
      } else {
        this.existsData = false;
      }
    }, (err) => {
      console.log(err);
    });
  }

  addCategoria(form: Categoria) {
    this.categoriaService.findByNombreCategoria(form.nombre_categoria)
    .subscribe(data => {
      console.log(data, "CATEGORIA");
      this.hasError = true;
      this.messageError = "La categoria ya existe";
    }, err => {
      this.hasError = false;
      this.categoriaService.addCategoria(form)
      .subscribe(res => {
        console.log("Categoria guardada ", res);
        this.isShow = !this.isShow;
        this.listarCategorias();
        this.categoriaForm.setValue({
          nombre_categoria: ""
        })
        this.alertService.success("Categoria Registrada");
      }, (err: HttpErrorResponse) => {
        this.hasError = true;
        console.log(err.error.errors.nombre_categoria);
        this.listaErrores = err.error.errors.nombre_categoria;
        this.listaErrores.map(error => {
          this.messageError = error
        })
      })
    })
    
  }

  openModal(contenido, id, nombre_categoria) {
    console.log(contenido);
    console.log(id);
    console.log(nombre_categoria);
    this.categoriaFormEdit.setValue({
      nombre_categoria: nombre_categoria,
      categoria_id: id
    });
    this.modal.open(contenido);
  }

  actualizarCategoria(form: Categoria) {
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

  eliminarCategoria(id: any) {
    this.categoriaService.deleteCategoria(id)
      .subscribe(res => {
        console.log(res);
        console.log('Categoria # ', id, " Eliminada");
        this.alertService.success("Se elimino la categoria");
        this.listarCategorias();
      }, (err: HttpErrorResponse) => {

      })
  }

  mostrarRegistroCategoria(): void {
    this.isShow = !this.isShow;
  }

  rewind(): void {
    if (this.page > 0) {
      this.page--;
      this.listarCategorias();
    }
  }

  forward(): void {
    if (this.page + 1 < this.pages) {
      this.page++;
      this.listarCategorias();
    }
  }
}
