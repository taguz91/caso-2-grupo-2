class Criticidad {
  late String createdAt;
  late String updatedAt;
  late int criticidadId;
  late String nombre;
  late double valor;
  late String descripcion;

  Criticidad({
    required this.createdAt,
    required this.updatedAt,
    required this.criticidadId,
    required this.nombre,
    required this.valor,
    required this.descripcion,
  });

  Criticidad.fromJson(Map<String, dynamic> json) {
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    criticidadId = json['criticidad_id'];
    nombre = json['nombre'];
    valor = json['valor'];
    descripcion = json['descripcion'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['createdAt'] = this.createdAt;
    data['updatedAt'] = this.updatedAt;
    data['criticidad_id'] = this.criticidadId;
    data['nombre'] = this.nombre;
    data['valor'] = this.valor;
    data['descripcion'] = this.descripcion;
    return data;
  }
}
