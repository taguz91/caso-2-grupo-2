import 'dart:convert';
import 'dart:io';

import 'package:flutter_app/src/models/common.dart';
import 'package:flutter_app/src/models/definitios.dart';
import 'package:flutter_app/src/models/usuario.dart';
import 'package:flutter_app/src/utils/constantes.dart';
import 'package:flutter_app/src/utils/http_auth.dart';

export 'package:flutter_app/src/models/usuario.dart';

class UsuarioProvider {
  final HttpAuth _httpAuth = new HttpAuth();

  static final UsuarioProvider _instance = new UsuarioProvider._internal();

  factory UsuarioProvider() {
    return _instance;
  }

  UsuarioProvider._internal();

  Future<LoginResponse> login(Map<String, dynamic> data) async {
    final url = Uri.parse('$URL_BASE_V1/usuario/login');
    final response = await _httpAuth.post(url, body: jsonEncode(data));

    LoginResponse login = new LoginResponse();

    Map<String, dynamic> dataResponse = json.decode(
      utf8.decode(response.bodyBytes),
    );
    if (HttpStatus.accepted == response.statusCode) {
      login.user = UserLogin.fromJson(dataResponse);
    } else {
      login.error = ErrorMessage.fromJson(dataResponse);
    }
    return login;
  }

  Future<List<ComboUsuario>> comboByType(int type) async {
    final url = Uri.parse('$URL_BASE_V1/usuario/combo/type/$type');
    final response = await _httpAuth.get(url);

    List<ComboUsuario> list = [];

    if (HttpStatus.ok == response.statusCode) {
      List<dynamic> dataResponse = json.decode(
        utf8.decode(response.bodyBytes),
      );
      dataResponse.forEach((json) {
        list.add(ComboUsuario.fromJson(json));
      });
    }
    return list;
  }

  Future<Usuario?> existUser(String q) async {
    final url = Uri.parse('$URL_BASE_V1/usuario/exists?q=$q');
    final response = await _httpAuth.get(url);

    if (HttpStatus.ok == response.statusCode) {
      Map<String, dynamic> dataResponse = json.decode(
        utf8.decode(response.bodyBytes),
      );
      return Usuario.fromJson(dataResponse);
    }
  }
}
