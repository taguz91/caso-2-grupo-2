import 'dart:io';

import 'package:flutter_app/src/utils/global_settings.dart';
import 'package:http/http.dart' as http;

class HttpAuth extends http.BaseClient {
  final GlobalSettings _globalSettings = GlobalSettings();

  static final HttpAuth _instance = new HttpAuth._internal();

  factory HttpAuth() {
    return _instance;
  }

  HttpAuth._internal();

  @override
  Future<http.StreamedResponse> send(http.BaseRequest request) {
    request.headers[HttpHeaders.authorizationHeader] =
        'Bearer ${_globalSettings.token}';
    request.headers[HttpHeaders.contentTypeHeader] = 'application/json';
    return request.send();
  }
}
