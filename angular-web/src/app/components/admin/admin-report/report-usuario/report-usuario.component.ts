import { Component, OnInit, ViewChild } from '@angular/core';
import { ReporteService } from 'src/app/services/reporte.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { Usuario } from '../../../../models/usuario';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-report-usuario',
  templateUrl: './report-usuario.component.html',
  styleUrls: ['./report-usuario.component.scss'],
})
export class ReportUsuarioComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  administradores: Usuario[] = [];
  dtTrigger: Subject<any> = new Subject<any>(); //Lista todos las ususarios con este ID
  rolId: number = 1;
  values: any[] = [];

  isDtInitialized: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private _reporte: ReporteService
  ) {}

  ngAfterViewInit(rolId1: number): void {
    console.log(rolId1);
    this.usuarioService.readAllUsersByRol(rolId1).subscribe((data) => {
      this.administradores = data;
      this.values = this.nuevosData();
      console.log(data);
      console.log(this.dtElement.dtInstance);
      if (this.isDtInitialized) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
          console.log(this.dtElement.dtInstance);
          console.log(this.dtOptions);
        });
      } else {
        console.log(this.dtElement.dtInstance);
        console.log(this.dtOptions);
        this.isDtInitialized = true;
        this.dtTrigger.next();
      }
    });
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json',
      },
    };
  }

  private nuevosData(): any[] {
    const values: any = [["ID","NOMBRE","APELLIDOS","CORREO","TELEFONO","USUARIO"]];
    this.administradores.forEach((admin) => {
      values.push([
        admin.personaId,
        admin.nombres,
        admin.apellidos,
        admin.correo,
        admin.telefono,
        admin.rol.nombre,
      ]);
    });
    return values;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  GetReporte() {
    this._reporte.reporte('tr');
  }
  exportAsXLSX() {
    this._reporte.exportToExcel(this.values, 'ExportEvaluate');
  }
}
