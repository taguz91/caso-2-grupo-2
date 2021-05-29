import 'package:flutter_app/src/models/categoria.dart';

class Servicio {
  late String createdAt;
  late String updatedAt;
  late int servicioId;
  late String nombreServicio;
  late Categoria categoria;

  Servicio({
    required this.createdAt,
    required this.updatedAt,
    required this.servicioId,
    required this.nombreServicio,
    required this.categoria,
  });

  Servicio.fromJson(Map<String, dynamic> json) {
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    servicioId = json['servicio_id'];
    nombreServicio = json['nombre_servicio'];
    categoria = new Categoria.fromJson(json['categoria']);
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['createdAt'] = this.createdAt;
    data['updatedAt'] = this.updatedAt;
    data['servicio_id'] = this.servicioId;
    data['nombre_servicio'] = this.nombreServicio;
    data['categoria'] = this.categoria.toJson();
    return data;
  }
}
