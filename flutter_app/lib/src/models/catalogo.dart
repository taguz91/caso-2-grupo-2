import 'package:flutter_app/src/models/parametros.dart';
import 'package:flutter_app/src/models/servicio.dart';
import 'package:flutter_app/src/models/sla.dart';

class CatalogoServicio {
  late int catalogoId;
  late String descripcion;

  CatalogoServicio.fromJson(Map<String, dynamic> json) {
    catalogoId = json['catalogo_id'];
    descripcion = json['descripcion'];
  }
}

class Catalogo {
  late String createdAt;
  late String updatedAt;
  late int catalogoId;
  late String descripcion;
  late Servicio servicio;
  late ParametroModel tipoServicio;
  late Sla sla;

  Catalogo({
    required this.createdAt,
    required this.updatedAt,
    required this.catalogoId,
    required this.descripcion,
    required this.servicio,
    required this.tipoServicio,
    required this.sla,
  });

  Catalogo.fromJson(Map<String, dynamic> json) {
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    catalogoId = json['catalogo_id'];
    descripcion = json['descripcion'];
    servicio = new Servicio.fromJson(json['servicio']);
    tipoServicio = new ParametroModel.fromJson(json['tipoServicio']);
    sla = new Sla.fromJson(json['sla']);
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['createdAt'] = this.createdAt;
    data['updatedAt'] = this.updatedAt;
    data['catalogo_id'] = this.catalogoId;
    data['descripcion'] = this.descripcion;
    data['servicio'] = this.servicio.toJson();
    data['tipoServicio'] = this.tipoServicio.toJson();
    data['sla'] = this.sla.toJson();

    return data;
  }
}
