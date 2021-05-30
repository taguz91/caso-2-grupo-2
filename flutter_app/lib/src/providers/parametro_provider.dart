import 'dart:convert';
import 'dart:io';

import 'package:flutter_app/src/models/parametros.dart';
import 'package:flutter_app/src/utils/constantes.dart';
import 'package:flutter_app/src/utils/http_auth.dart';

export 'package:flutter_app/src/models/parametros.dart';

class ParametroProvider {
  final HttpAuth _httpAuth = new HttpAuth();

  static final ParametroProvider _instance = new ParametroProvider._internal();

  factory ParametroProvider() {
    return _instance;
  }

  ParametroProvider._internal();

  Future<List<Parametro>> listTipoServicios() {
    return _callService('$URL_BASE_V1/parametros/tipo-servicios');
  }

  Future<List<Parametro>> listImpactos() {
    return _callService('$URL_BASE_V1/parametros/impacto');
  }

  Future<List<Parametro>> listEstados() {
    return _callService('$URL_BASE_V1/parametros/estados');
  }

  Future<List<Parametro>> _callService(String url) async {
    final List<Parametro> list = [];

    final urlRequest = Uri.parse(url);
    final response = await _httpAuth.get(urlRequest);
    if (response.statusCode == HttpStatus.ok) {
      List<dynamic> dataResponse = json.decode(
        utf8.decode(response.bodyBytes),
      );
      dataResponse.forEach((json) {
        list.add(Parametro.fromJson(json));
      });
    }

    return list;
  }
}
