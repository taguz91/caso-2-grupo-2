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
  UserLogin _user = UserLogin(
    personaId: 0,
    type: ROL_DEVELOPER,
    apellidos: 'Offline',
    nombres: 'Offline',
    correo: 'offline@dev.tec',
    rol: 'Developer',
    token: '',
  );
  bool isOnline = true;

  init() async {
    _preferences = await SharedPreferences.getInstance();
  }

  String get token => _preferences.getString(TOKEN_NAME) ?? '';

  UserLogin get user => this._user;

  set user(UserLogin user) {
    _preferences.setString(TOKEN_NAME, user.token);
    this._user = user;
  }

  void logout() {
    _preferences.setString(TOKEN_NAME, '');
  }
}
