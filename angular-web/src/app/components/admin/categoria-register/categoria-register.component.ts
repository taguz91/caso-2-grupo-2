import { Component, OnInit } from '@angular/core';

import { Categoria } from '../../../models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';
import { PageMetadata } from 'src/app/models/Parametros';
import { DEFAULT_PAGE_METADA, DEFAULT_PAGE_SIZE } from 'src/app/utils/constantes';
import { ServicioService } from 'src/app/services/servicio.service';


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

  pageMetaData: PageMetadata = DEFAULT_PAGE_METADA;
  perPage: number = DEFAULT_PAGE_SIZE;
  actualPage: number = 0;

  categoriaForm = new FormGroup({
    nombre_categoria: new FormControl('', Validators.required)
  })

  categoriaFormEdit = new FormGroup({
    nombre_categoria: new FormControl('', Validators.required),
    categoria_id: new FormControl()
  })

  constructor(private categoriaService: CategoriaService,
    public modal: NgbModal,
    private servicioService: ServicioService,
    private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.listarCategorias();
  }

  get page() {
    return this.actualPage + 1;
  }

  set page(page: number) {
    this.actualPage = page - 1;
    this.listarCategorias();
  }


  listarCategorias() {
    this.categoriaService.listCategorias(this.actualPage).subscribe(data => {
      if (data != null) {
        this.listaCategoria = data['data']
        this.existsData = true;
        this.pageMetaData = data.meta;
      } else {
        this.existsData = false;
        this.alertService.info("No existen categorias registradas");
      }
    }, (err: HttpErrorResponse) => {

    });
  }

  addCategoria(form: Categoria) {
    this.categoriaService.findByNombreCategoria(form.nombre_categoria)
      .subscribe(data => {
        this.hasError = true;
        this.messageError = "La categoria ya existe";
      }, err => {
        this.hasError = false;
        this.categoriaService.addCategoria(form)
          .subscribe(res => {
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
    this.categoriaFormEdit.setValue({
      nombre_categoria: nombre_categoria,
      categoria_id: id
    });
    this.modal.open(contenido);
  }

  actualizarCategoria(form: Categoria) {
    this.categoriaService.updateCategoria(form.categoria_id, form)
      .subscribe(res => {
        this.alertService.success("Se actualizo la categoria");
        this.listarCategorias();
        this.modal.dismissAll();
      }, (err: HttpErrorResponse) => {
        this.hasError = true;
        this.listaErrores = err.error.errors.nombre_categoria;
        this.listaErrores.map(error => {
          this.messageError = error
        })
      })
  }

  eliminarCategoria(id: any) {
    this.servicioService.getServicioByCategoria(id).subscribe(data => {
      console.log(data);
      if (data.length == 0) {
        this.categoriaService.deleteCategoria(id)
          .subscribe(res => {
            this.alertService.success("Se elimino la categoria");
            this.listarCategorias();
          }, (err: HttpErrorResponse) => {

          })
      } else {
        this.alertService.error("La categoria tiene servicios registrados");
      }
    })

  }

  mostrarRegistroCategoria(): void {
    this.isShow = !this.isShow;
  }
}
