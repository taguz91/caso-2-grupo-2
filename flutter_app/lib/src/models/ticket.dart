import 'package:flutter_app/src/models/adjunto.dart';
import 'package:flutter_app/src/models/catalogo.dart';
import 'package:flutter_app/src/models/historial.dart';
import 'package:flutter_app/src/models/medio_comunicacion.dart';
import 'package:flutter_app/src/models/parametros.dart';
import 'package:flutter_app/src/models/usuario.dart';

class TicketHome {
  late int ticketId;
  late String titulo;
  late String estado;
  late String tipo;
  late String createdAt;

  TicketHome({
    required this.ticketId,
    required this.titulo,
    required this.estado,
    required this.tipo,
    required this.createdAt,
  });

  TicketHome.fromJson(Map<String, dynamic> json) {
    ticketId = json['ticket_id'];
    titulo = json['titulo'];
    estado = json['estado'];
    tipo = json['tipo'];
    createdAt = json['created_at'];
  }
}

class TicketView {
  late String createdAt;
  late String updatedAt;
  late int ticketId;
  late String titulo;
  late String descripcion;
  late String? solucion;
  late String? fechaSolucion;
  late String? fechaAsignacion;
  late ParametroModel estado;
  late ParametroModel impacto;
  late List<Hisotorial> listaHistorial;
  // late Null encuesta;
  late List<Adjunto> adjuntos;
  late Usuario? responsable;
  late Usuario usuario;
  late Usuario? responsableSolucion;
  late Catalogo catalogo;
  late List<MedioComunicacion> mediosComunicacion;

  TicketView({
    required this.createdAt,
    required this.updatedAt,
    required this.ticketId,
    required this.titulo,
    required this.descripcion,
    required this.solucion,
    required this.fechaSolucion,
    required this.fechaAsignacion,
    required this.estado,
    required this.impacto,
    required this.listaHistorial,
    // required this.encuesta,
    required this.adjuntos,
    required this.responsable,
    required this.usuario,
    required this.responsableSolucion,
    required this.catalogo,
    required this.mediosComunicacion,
  });

  TicketView.fromJson(Map<String, dynamic> json) {
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    ticketId = json['ticket_id'];
    titulo = json['titulo'];
    descripcion = json['descripcion'];
    solucion = json['solucion'];
    fechaSolucion = json['fechaSolucion'];
    fechaAsignacion = json['fechaAsignacion'];
    estado = new ParametroModel.fromJson(json['estado']);
    impacto = new ParametroModel.fromJson(json['impacto']);
    listaHistorial = [];
    if (json['listaHistorial'] != null) {
      json['listaHistorial'].forEach((v) {
        listaHistorial.add(new Hisotorial.fromJson(v));
      });
    }
    // encuesta = json['encuesta'];
    if (json['adjuntos'] != null) {
      List<Adjunto> adjuntos = [];
      json['adjuntos'].forEach((v) {
        adjuntos.add(new Adjunto.fromJson(v));
      });
    }
    responsable = json['responsable'] != null
        ? Usuario.fromJson(json['responsable'])
        : null;
    usuario = new Usuario.fromJson(json['usuario']);
    responsableSolucion = json['responsableSolucion'] != null
        ? Usuario.fromJson(json['responsableSolucion'])
        : null;
    catalogo = new Catalogo.fromJson(json['catalogo']);
    if (json['mediosComunicacion'] != null) {
      List<MedioComunicacion> mediosComunicacion = [];
      json['mediosComunicacion'].forEach((v) {
        mediosComunicacion.add(new MedioComunicacion.fromJson(v));
      });
    }
  }
}
