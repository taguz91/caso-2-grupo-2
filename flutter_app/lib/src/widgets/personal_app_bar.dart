import 'package:flutter/material.dart';
import 'package:flutter_app/routes_generator.dart';
import 'package:flutter_app/src/utils/constantes.dart';

import 'package:flutter_app/src/utils/global_settings.dart';
import 'package:flutter_app/src/models/usuario.dart';

class PersonalAppBar extends StatelessWidget implements PreferredSizeWidget {
  final GlobalSettings _globalSettings = GlobalSettings();

  @override
  Widget build(BuildContext context) {
    UserLogin user = _globalSettings.user;

    return AppBar(
      elevation: 0,
      leading: IconButton(
        onPressed: () {
          if (user.type == ROL_COORDINADOR) {
            Navigator.pushNamed(context, COORDINADOR_PAGE);
          } else {
            Navigator.pushNamed(context, SOPORTE_PAGE);
          }
        },
        icon: Icon(
          Icons.home,
          color: Theme.of(context).primaryColor,
        ),
      ),
      title: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Bienvenido, ${user.nombreCompleto}',
            style: TextStyle(
              color: Colors.black,
              fontSize: 18,
            ),
          ),
          Text(
            '${user.rol}',
            style: TextStyle(
              color: Colors.black54,
              fontSize: 16,
            ),
          ),
        ],
      ),
      actions: [
        IconButton(
          onPressed: () {
            Navigator.of(context).pushReplacementNamed(DEFAULT);
          },
          icon: Icon(
            Icons.chevron_right,
            color: Colors.red,
          ),
        ),
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
