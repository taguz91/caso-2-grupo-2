import 'package:flutter/material.dart';
import 'package:flutter_app/src/models/usuario.dart';
import 'package:flutter_app/src/utils/global_settings.dart';
import 'package:flutter_app/src/widgets/personal_app_bar.dart';
import 'package:flutter_app/src/widgets/user_app_bar.dart';

class HomeOfflinePage extends StatelessWidget {
  final _globalSettings = GlobalSettings();

  @override
  Widget build(BuildContext context) {
    UserLogin user = _globalSettings.user;

    if (user.isPersonal) {
      return Scaffold(
        appBar: PersonalAppBar(),
        body: Container(),
      );
    }
    return Scaffold(
      appBar: UserAppBar(),
      body: Container(),
    );
  }
}
