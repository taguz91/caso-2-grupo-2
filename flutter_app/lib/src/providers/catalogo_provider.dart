import 'dart:convert';
import 'dart:io';

import 'package:flutter_app/src/models/catalogo.dart';
import 'package:flutter_app/src/models/definitios.dart';
import 'package:flutter_app/src/utils/constantes.dart';
import 'package:flutter_app/src/utils/http_auth.dart';

export 'package:flutter_app/src/models/catalogo.dart';
export 'package:flutter_app/src/models/definitios.dart';

class CatalogoProvider {
  final HttpAuth _httpAuth = new HttpAuth();

  static final CatalogoProvider _instance = new CatalogoProvider._internal();

  factory CatalogoProvider() {
    return _instance;
  }

  CatalogoProvider._internal();

  Future<PageResponse<List<CatalogoServicio>>> listCatalogoServicio({
    required int tipoServicio,
    required int page,
  }) async {
    final List<CatalogoServicio> list = [];
    PageMetadata meta = PageMetadata.base();

    final url = Uri.parse(
        '$URL_BASE_V1/catalogo/tipo/$tipoServicio?page=$page&size=$DEFAULT_PAGE_SIZE');
    final response = await _httpAuth.get(url);
    if (response.statusCode == HttpStatus.ok) {
      Map<String, dynamic> dataResponse = json.decode(
        utf8.decode(response.bodyBytes),
      );

      dataResponse['data'].forEach((json) {
        list.add(CatalogoServicio.fromJson(json));
      });
      meta = PageMetadata.fromJson(dataResponse['meta']);
    }

    return new PageResponse(data: list, meta: meta);
  }
}
