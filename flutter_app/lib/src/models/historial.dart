class Hisotorial {
  late String createdAt;
  late String updatedAt;
  late int historialId;
  late String accion;

  Hisotorial({
    required this.createdAt,
    required this.updatedAt,
    required this.historialId,
    required this.accion,
  });

  Hisotorial.fromJson(Map<String, dynamic> json) {
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    historialId = json['historial_id'];
    accion = json['accion'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['createdAt'] = this.createdAt;
    data['updatedAt'] = this.updatedAt;
    data['historial_id'] = this.historialId;
    data['accion'] = this.accion;
    return data;
  }
}
