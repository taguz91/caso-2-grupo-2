import 'package:flutter_app/src/models/criticidad.dart';
import 'package:flutter_app/src/models/parametros.dart';

class Sla {
  late String createdAt;
  late String updatedAt;
  late int slaId;
  late String tiempoResolucion;
  late String tiempoRespuesta;
  late String reglasEscalada;
  late Criticidad criticidad;
  late ParametroModel impacto;
  late ParametroModel nivelPrioridad;

  Sla({
    required this.createdAt,
    required this.updatedAt,
    required this.slaId,
    required this.tiempoResolucion,
    required this.tiempoRespuesta,
    required this.reglasEscalada,
    required this.criticidad,
    required this.impacto,
    required this.nivelPrioridad,
  });

  Sla.fromJson(Map<String, dynamic> json) {
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    slaId = json['sla_id'];
    tiempoResolucion = json['tiempoResolucion'];
    tiempoRespuesta = json['tiempoRespuesta'];
    reglasEscalada = json['reglasEscalada'];
    criticidad = new Criticidad.fromJson(json['criticidad']);
    impacto = new ParametroModel.fromJson(json['impacto']);
    nivelPrioridad = new ParametroModel.fromJson(json['nivelPrioridad']);
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['createdAt'] = this.createdAt;
    data['updatedAt'] = this.updatedAt;
    data['sla_id'] = this.slaId;
    data['tiempoResolucion'] = this.tiempoResolucion;
    data['tiempoRespuesta'] = this.tiempoRespuesta;
    data['reglasEscalada'] = this.reglasEscalada;
    data['criticidad'] = this.criticidad.toJson();
    data['impacto'] = this.impacto.toJson();
    data['nivelPrioridad'] = this.nivelPrioridad.toJson();

    return data;
  }
}
