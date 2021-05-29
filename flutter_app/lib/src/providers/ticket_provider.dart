import 'dart:convert';
import 'dart:io';

import 'package:flutter_app/src/models/definitios.dart';
import 'package:flutter_app/src/models/ticket.dart';
import 'package:flutter_app/src/utils/http_auth.dart';
import 'package:flutter_app/src/utils/constantes.dart';

export 'package:flutter_app/src/models/ticket.dart';
export 'package:flutter_app/src/models/definitios.dart';

class TicketProvider {
  final HttpAuth _httpAuth = new HttpAuth();

  static final TicketProvider _instance = new TicketProvider._internal();

  factory TicketProvider() {
    return _instance;
  }

  TicketProvider._internal();

  Future<PageResponse<List<TicketHome>>> listUser(int page) async {
    return _mapTicketHome(
      '$URL_BASE_V1/ticket/user/home?page=$page&size=$DEFAULT_PAGE_SIZE',
    );
  }

  Future<PageResponse<List<TicketHome>>> listByEstado({
    required int page,
    required int estado,
  }) async {
    return _mapTicketHome(
      '$URL_BASE_V1/ticket/estado/$estado?page=$page&size=$DEFAULT_PAGE_SIZE',
    );
  }

  Future<PageResponse<List<TicketHome>>> listSoporte(int page) async {
    return _mapTicketHome(
      '$URL_BASE_V1/ticket/soporte?page=$page&size=$DEFAULT_PAGE_SIZE',
    );
  }

  Future<TicketView?> rechazar(Map<String, dynamic> data) async {
    return _mapTicketView(
      '$URL_BASE_V1/ticket/rechazar',
      data,
    );
  }

  Future<TicketView?> cerrar(Map<String, dynamic> data) async {
    return _mapTicketView(
      '$URL_BASE_V1/ticket/cerrar',
      data,
    );
  }

  Future<TicketView?> asignar(Map<String, dynamic> data) async {
    return _mapTicketView(
      '$URL_BASE_V1/ticket/asignar',
      data,
    );
  }

  Future<TicketView?> _mapTicketView(
    String urlParam,
    Map<String, dynamic> data,
  ) async {
    final url = Uri.parse(urlParam);
    final response = await _httpAuth.post(url, body: jsonEncode(data));

    if (HttpStatus.ok == response.statusCode) {
      Map<String, dynamic> dataResponse = json.decode(response.body);
      return TicketView.fromJson(dataResponse);
    }
  }

  Future<PageResponse<List<TicketHome>>> _mapTicketHome(
    String urlParam,
  ) async {
    final List<TicketHome> list = [];
    PageMetadata meta = PageMetadata.base();

    final url = Uri.parse(urlParam);
    final response = await _httpAuth.get(url);
    if (response.statusCode == HttpStatus.ok) {
      Map<String, dynamic> dataResponse = json.decode(
        utf8.decode(response.bodyBytes),
      );
      dataResponse['data'].forEach((json) {
        list.add(TicketHome.fromJson(json));
      });
      meta = PageMetadata.fromJson(dataResponse['meta']);
    }
    return new PageResponse(data: list, meta: meta);
  }

  Future<DataOrMessage<TicketView>> one(int ticketId) async {
    final url = Uri.parse('$URL_BASE_V1/ticket/$ticketId');
    final response = await _httpAuth.get(url);
    if (response.statusCode == HttpStatus.ok) {
      Map<String, dynamic> dataResponse = json.decode(
        utf8.decode(response.bodyBytes),
      );
      return DataOrMessage(data: TicketView.fromJson(dataResponse));
    }

    return DataOrMessage(message: 'No encontramos el ticket #$ticketId');
  }

  Future<int> registerTikcet(Map<String, dynamic> data) async {
    final url = Uri.parse('$URL_BASE_V1/ticket/save');
    final response = await _httpAuth.post(url, body: jsonEncode(data));

    if (HttpStatus.created == response.statusCode) {
      Map<String, dynamic> dataResponse = json.decode(response.body);
      return dataResponse['ticket_id'] ?? 0;
    }

    return 0;
  }
}
