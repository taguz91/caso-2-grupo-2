import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Categoria } from 'src/app/models/categoria';
import { Servicio } from 'src/app/models/servicio';
import { AlertService } from 'src/app/services/alert.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ServicioService } from 'src/app/services/servicio.service';

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

  page = 0;
  size = 10;
  items: number;
  pages: number;

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
    private categoriaService: CategoriaService
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
        console.log(data['data']);
        this.listaCategorias = data['data'];
      } else {
        this.existsData = false;
        this.existsListCategoria = false;
        console.log('no hay');
      }
    })
  }

  listarServicios(){
    this.servicioService.listServicio(this.page, this.size).subscribe(data => {
      if(data != null){
        this.listaServicios = data['data']
        this.page = data.meta.current;
        this.items = data.meta.items;
        this.pages = data.meta.pages;
      } else {
        this.alertService.info("No existen servicios registrados");
      }
    })
  }

  addServicio(form: Servicio){
    console.log(form);
    this.servicioService.addServicio(form)
    .subscribe(res => {
      this.listarServicios();
      this.isShow = !this.isShow;
      this.alertService.success("Servicio registrado");
    }, (err: HttpErrorResponse) => {
      this.hasError = true;
      console.log(err.error.errors.nombre_servicio);
      console.log(err.error.errors.categoriaId);
      this.listaErroresServicio = err.error.errors.nombre_servicio;
      this.listaErroresCategoriaId = err.error.errors.categoriaId;
    })
  }

  openModal(contenido, id, nombre_servicio){
    this.categoriaService.listCategorias()
    .subscribe(data => {
      if(data != null){
        this.listaCategorias = data['data'];
      }  
    })
    
    this.servicioFormEdit.setValue({
      nombre_servicio: nombre_servicio,
      servicio_id: id,
      categoriaId:  [ this.listaCategorias ]
    });
    this.modal.open(contenido);
  }

  actualizarServicio(form: Servicio){
    console.log(form, " PARA VER QUE TIENE")
    this.servicioService.updateServicio(form.servicio_id, form)
    .subscribe(res => {
      console.log("Servicio # "+ form.servicio_id + " actualizado -> ", form);
      console.log(res);
      this.alertService.success("Se actualizo el servicio");
      this.listarServicios();
      this.modal.dismissAll();
    }, (err: HttpErrorResponse) => {
      console.log(err.error.errors);
      this.hasError = true;
      this.listaErroresServicio = err.error.errors.nombre_servicio;
      this.listaErroresCategoriaId = err.error.errors.categoriaId;
    })
  }


  eliminarServicio(id: any){
    this.servicioService.deleteServicio(id)
    .subscribe(res => {
      console.log('Categoria # ', id, ' Eliminado');
      this.alertService.success("Se elimino la categoria");
      this.listarServicios();
    }, (err: HttpErrorResponse) => {
      
    })
  }

  rewind():void{
    if(this.page > 0){
      this.page--;
      this.listarServicios();
    }
  }

  forward():void{
    if(this.page + 1 < this.pages){
      this.page++;
      this.listarServicios();
    }
  }

}
