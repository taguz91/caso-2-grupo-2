import 'package:flutter/material.dart';

import 'package:flutter_app/src/models/usuario.dart';
import 'package:flutter_app/src/utils/global_settings.dart';
import 'package:flutter_app/src/widgets/logout_button.dart';

class UserAppBar extends StatelessWidget implements PreferredSizeWidget {
  final GlobalSettings _globalSettings = new GlobalSettings();

  @override
  Widget build(BuildContext context) {
    UserLogin user = _globalSettings.user;
    return AppBar(
      elevation: 0,
      title: Text(
        'Bienvenido, ${user.nombreCompleto}',
        style: TextStyle(
          color: Colors.black,
          fontSize: 18,
        ),
      ),
      actions: [
        LogoutButton(),
      ],
      bottom: PreferredSize(
        child: Container(
          color: Colors.black26,
          height: 1,
        ),
        preferredSize: Size.fromHeight(1),
      ),
    );
  }

  @override
  Size get preferredSize => Size.fromHeight(60);
}
