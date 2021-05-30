import 'package:flutter_app/src/models/rol.dart';

class UserLogin {
  late int personaId;
  late String apellidos;
  late String nombres;
  late String correo;
  late String rol;
  late String token;
  late int type;

  UserLogin({
    required this.personaId,
    required this.apellidos,
    required this.nombres,
    required this.correo,
    required this.rol,
    required this.token,
    required this.type,
  });

  UserLogin.fromJson(Map<String, dynamic> json) {
    personaId = json['personaId'];
    apellidos = json['apellidos'];
    nombres = json['nombres'];
    correo = json['correo'];
    rol = json['rol'];
    token = json['token'];
    type = json['type'];
  }

  get nombreCompleto => '$nombres $apellidos';
}

class Usuario {
  late String createdAt;
  late String updatedAt;
  late int personaId;
  late String? cedula;
  late String nombres;
  late String apellidos;
  late String correo;
  late String token;
  late String telefono;
  late Rol rol;
  late String nombreCompleto;

  Usuario({
    required this.createdAt,
    required this.updatedAt,
    required this.personaId,
    required this.cedula,
    required this.nombres,
    required this.apellidos,
    required this.correo,
    required this.token,
    required this.telefono,
    required this.rol,
    required this.nombreCompleto,
  });

  Usuario.fromJson(Map<String, dynamic> json) {
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    personaId = json['personaId'];
    cedula = json['cedula'];
    nombres = json['nombres'];
    apellidos = json['apellidos'];
    correo = json['correo'];
    token = json['token'];
    telefono = json['telefono'];
    rol = new Rol.fromJson(json['rol']);
    nombreCompleto = json['nombreCompleto'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['createdAt'] = this.createdAt;
    data['updatedAt'] = this.updatedAt;
    data['personaId'] = this.personaId;
    data['cedula'] = this.cedula;
    data['nombres'] = this.nombres;
    data['apellidos'] = this.apellidos;
    data['correo'] = this.correo;
    data['token'] = this.token;
    data['telefono'] = this.telefono;
    data['rol'] = this.rol.toJson();
    data['nombreCompleto'] = this.nombreCompleto;
    return data;
  }
}