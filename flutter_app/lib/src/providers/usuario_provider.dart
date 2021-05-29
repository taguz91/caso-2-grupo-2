import 'dart:convert';
import 'dart:io';

import 'package:flutter_app/src/models/common.dart';
import 'package:flutter_app/src/models/definitios.dart';
import 'package:flutter_app/src/models/usuario.dart';
import 'package:flutter_app/src/utils/constantes.dart';
import 'package:flutter_app/src/utils/http_auth.dart';

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

    Map<String, dynamic> dataResponse = json.decode(response.body);
    if (HttpStatus.accepted == response.statusCode) {
      login.user = UserLogin.fromJson(dataResponse);
    } else {
      login.error = ErrorMessage.fromJson(dataResponse);
    }
    return login;
  }
}
