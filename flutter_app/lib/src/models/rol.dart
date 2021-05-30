class Rol {
  late String createdAt;
  late String updatedAt;
  late int rolId;
  late String nombre;

  Rol({
    required this.createdAt,
    required this.updatedAt,
    required this.rolId,
    required this.nombre,
  });

  Rol.fromJson(Map<String, dynamic> json) {
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    rolId = json['rolId'];
    nombre = json['nombre'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['createdAt'] = this.createdAt;
    data['updatedAt'] = this.updatedAt;
    data['rolId'] = this.rolId;
    data['nombre'] = this.nombre;
    return data;
  }
}
