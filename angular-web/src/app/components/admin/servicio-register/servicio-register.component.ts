import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Categoria } from 'src/app/models/categoria';
import { PageMetadata } from 'src/app/models/Parametros';
import { Servicio } from 'src/app/models/servicio';
import { AlertService } from 'src/app/services/alert.service';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { DEFAULT_PAGE_METADA, DEFAULT_PAGE_SIZE } from 'src/app/utils/constantes';

@Component({
  selector: 'app-servicio-register',
  templateUrl: './servicio-register.component.html',
  styleUrls: ['./servicio-register.component.scss']
})
export class ServicioRegisterComponent implements OnInit {

  listaServicios: Servicio[];
  listaCategorias: Categoria[];
  isShow: boolean = false;
  seleccionado: any;
  categoria: Categoria;
  servicio: Servicio;
  hasError: boolean = false;
  listaErroresServicio: any[];
  listaErroresCategoriaId: any[];
  existsData: boolean = false;
  existsListCategoria: boolean = false;

  pageMetaData: PageMetadata = DEFAULT_PAGE_METADA;
  perPage: number = DEFAULT_PAGE_SIZE;
  actualPage: number = 0;

  datosPorLista: number = 1;

  get page(){
    return this.actualPage + 1;
  }

  set page(page: number){
    this.actualPage = page - 1;
    this.listarServicios();
  }

  mostrarMas(){
    this.perPage = this.perPage + 10;
    this.listarCategorias();
  }

  formServicio = new FormGroup({
    nombre_servicio: new FormControl('', Validators.required),
    categoriaId: new FormControl(null)
  });

  servicioFormEdit = new FormGroup({
    nombre_servicio: new FormControl('', Validators.required),
    servicio_id: new FormControl(null),
    categoriaId: new FormControl(null)
  })


  constructor(
    private servicioService: ServicioService, 
    public modal:NgbModal, 
    private alertService:AlertService,
    private categoriaService: CategoriaService,
    private catalogoService: CatalogoService
    ) { }

  ngOnInit(): void {
    this.listarServicios();
  }

  mostrarRegistroServicio(){
    this.isShow = !this.isShow;
    this.listarCategorias();
  }

  listarCategorias(){
    this.categoriaService.listCategoriasToServicio().subscribe(data => {
      if(data != null){
        this.existsListCategoria = true;
        this.existsData = true;
        this.listaCategorias = data['data'];
      } else {
        this.existsData = false;
        this.existsListCategoria = false;
      }
    })
  }

  listarServicios(){
    this.servicioService.listServicio(this.actualPage).subscribe(data => {
      if(data != null){
        this.listaServicios = data['data'];
        this.pageMetaData = data.meta;
      } else {
        this.alertService.info("No existen servicios registrados");
      }
    })
  }

  addServicio(form: Servicio){
    this.servicioService.addServicio(form)
    .subscribe(res => {
      this.listarServicios();
      this.isShow = !this.isShow;
      this.hasError = false;
      this.alertService.success("Servicio registrado");
    }, (err: HttpErrorResponse) => {
      this.hasError = true;
      this.listaErroresServicio = err.error.errors.nombre_servicio;
      this.listaErroresCategoriaId = err.error.errors.categoriaId;
    });
    this.formServicio.reset();
  }

  openModal(contenido, id, nombre_servicio){
    this.categoriaService.listCategoriasToServicio()
    .subscribe(data => {
      if(data != null){
        this.listaCategorias = data['data'];
      }  
    });
    
    this.servicioFormEdit.setValue({
      nombre_servicio: nombre_servicio,
      servicio_id: id,
      categoriaId:  [ this.listaCategorias ]
    });
    this.modal.open(contenido);
  }

  actualizarServicio(form: Servicio){
    this.servicioService.updateServicio(form.servicio_id, form)
    .subscribe(res => {
      this.alertService.success("Se actualizo el servicio");
      this.listarServicios();
      this.modal.dismissAll();
      this.hasError = false;
    }, (err: HttpErrorResponse) => {
      this.hasError = true;
      this.listaErroresServicio = err.error.errors.nombre_servicio;
      this.listaErroresCategoriaId = err.error.errors.categoriaId;
    });
    this.servicioFormEdit.reset();
  }


  eliminarServicio(id: any){
    this.servicioService.deleteServicio(id)
    .subscribe(res => {
      this.alertService.success("Se elimino la categoria");
      this.listarServicios();
    }, (err: HttpErrorResponse) => {
      
    })
  }

}
