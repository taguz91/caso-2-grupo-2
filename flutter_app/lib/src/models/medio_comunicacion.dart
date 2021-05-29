import 'package:flutter_app/src/models/parametros.dart';

class MedioComunicacion {
  late String createdAt;
  late String updatedAt;
  late int medioId;
  late ParametroModel medio;

  MedioComunicacion({
    required this.createdAt,
    required this.updatedAt,
    required this.medioId,
    required this.medio,
  });

  MedioComunicacion.fromJson(Map<String, dynamic> json) {
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    medioId = json['medio_id'];
    medio = ParametroModel.fromJson(json['medio']);
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['createdAt'] = this.createdAt;
    data['updatedAt'] = this.updatedAt;
    data['medio_id'] = this.medioId;
    data['medio'] = this.medio.toJson();

    return data;
  }
}
