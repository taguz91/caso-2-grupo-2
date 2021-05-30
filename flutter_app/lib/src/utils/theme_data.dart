import 'package:flutter/material.dart';

const GREY_BORDER_COLOR = Color(0xFFdee2e6);
const GREY_COLOR = Color(0xFFe9ecef);
const PRIMARY_COLOR = Color(0xFF1B214A);
const SUCCESS_COLOR = Color(0xFF198754);
const DANGER_COLOR = Color(0xFFdc3545);
const WARNING_COLOR = Color(0xFFffc107);

class ThemeDataTirtec {
  static final ThemeDataTirtec _instance = new ThemeDataTirtec._internal();

  factory ThemeDataTirtec() {
    return _instance;
  }

  ThemeDataTirtec._internal();

  static get defaultBorder => Border.all(color: GREY_BORDER_COLOR, width: 1.5);
}
