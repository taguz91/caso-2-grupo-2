import 'package:flutter_app/src/models/common.dart';
import 'package:flutter_app/src/models/usuario.dart';

class LoginResponse {
  UserLogin? user;
  ErrorMessage? error;

  LoginResponse({this.user, this.error});
}

class PageResponse<T> {
  T data;
  PageMetadata meta;

  PageResponse({
    required this.data,
    required this.meta,
  });
}

class DataOrMessage<T> {
  T? data;
  String? message;

  DataOrMessage({this.data, this.message});
}

class PageMetadata {
  late int current;
  late int items;
  late int pages;
  late int perPage;

  PageMetadata.base() {
    current = 0;
    items = 0;
    pages = 0;
    perPage = 0;
  }

  PageMetadata.fromJson(Map<String, dynamic> json) {
    current = json['current'];
    items = json['items'];
    pages = json['pages'];
    perPage = json['perPage'];
  }

  bool isLastPage(int page) {
    return pages == page + 1 || pages == 0;
  }
}
