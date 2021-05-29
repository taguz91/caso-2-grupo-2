import 'package:flutter_app/src/models/usuario.dart';
import 'package:flutter_app/src/utils/constantes.dart';
import 'package:shared_preferences/shared_preferences.dart';

class GlobalSettings {
  static final GlobalSettings _instance = new GlobalSettings._internal();

  factory GlobalSettings() {
    return _instance;
  }

  GlobalSettings._internal();

  late SharedPreferences _preferences;
  late UserLogin _user;

  init() async {
    _preferences = await SharedPreferences.getInstance();
  }

  String get token => _preferences.getString(TOKEN_NAME) ?? '';

  UserLogin get user => this._user;

  set user(UserLogin user) {
    _preferences.setString(TOKEN_NAME, user.token);
    this._user = user;
  }
}
