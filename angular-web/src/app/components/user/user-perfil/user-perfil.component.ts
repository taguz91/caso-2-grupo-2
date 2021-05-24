import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { LoginUser } from 'src/app/models/usuario';
import { SessionService } from 'src/app/services/session.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-user-perfil',
  templateUrl: './user-perfil.component.html',
  styleUrls: ['./user-perfil.component.scss'],
})
export class UserPerfilComponent implements OnInit {
  user: LoginUser;
  options: EChartsOption;

  constructor(
    private sessionService: SessionService,
    private userService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.loadUser();
    this.loadChart();
  }

  private loadUser() {
    const user = this.sessionService.user;
    this.sessionService.getUser().subscribe((_) => this.loadUser());
    if (user) {
      this.user = user;
    }
  }

  private loadChart() {
    this.userService.getTicketsCount().subscribe((res) => {
      const dataLegend = [];
      const dataSeries = [];
      res.forEach((data) => {
        dataLegend.push(data.nombre);
        dataSeries.push({
          value: data.total,
          name: data.nombre,
        });
      });
      this.options = {
        title: {
          text: 'Estado de tickets',
          top: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          bottom: 1,
          data: dataLegend,
        },
        calculable: true,
        series: [
          {
            name: 'Estados',
            type: 'pie',
            roseType: 'radius',
            radius: [30, 130],
            data: dataSeries,
          },
        ],
      };
    });
  }
}
