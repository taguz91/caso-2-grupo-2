class Parametro {
  late int parametrosId;
  late String nombre;
  late String descripcion;

  Parametro.fromJson(Map<String, dynamic> json) {
    parametrosId = json['parametros_id'];
    nombre = json['nombre'];
    descripcion = json['descripcion'];
  }
}

class ParametroModel {
  late int parametrosId;
  late int type;
  late String nombre;
  late String descripcion;
  late String createdAt;
  late String updatedAt;

  ParametroModel({
    required this.createdAt,
    required this.updatedAt,
    required this.parametrosId,
    required this.type,
    required this.nombre,
    required this.descripcion,
  });

  ParametroModel.fromJson(Map<String, dynamic> json) {
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    parametrosId = json['parametros_id'];
    type = json['type'];
    nombre = json['nombre'];
    descripcion = json['descripcion'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['createdAt'] = this.createdAt;
    data['updatedAt'] = this.updatedAt;
    data['parametros_id'] = this.parametrosId;
    data['type'] = this.type;
    data['nombre'] = this.nombre;
    data['descripcion'] = this.descripcion;
    return data;
  }
}
