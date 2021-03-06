import 'package:flutter/material.dart';

import 'package:flutter_app/routes_generator.dart';
import 'package:flutter_app/src/utils/global_settings.dart';
import 'package:flutter_app/src/models/usuario.dart';
import 'package:flutter_app/src/widgets/logout_button.dart';
import 'package:flutter_app/src/widgets/user/user_accounts.dart';

class PersonalAppBar extends StatelessWidget implements PreferredSizeWidget {
  final GlobalSettings _globalSettings = GlobalSettings();

  @override
  Widget build(BuildContext context) {
    UserLogin user = _globalSettings.user;

    return AppBar(
      elevation: 0,
      leading: IconButton(
        onPressed: () {
          if (_globalSettings.isOnline) {
            if (user.isCoordinador) {
              Navigator.pushReplacementNamed(context, COORDINADOR_PAGE);
            } else {
              Navigator.pushReplacementNamed(context, SOPORTE_PAGE);
            }
          } else {
            Navigator.pushReplacementNamed(context, LOAD);
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
            showModalBottomSheet(
              context: context,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.all(Radius.circular(20)),
              ),
              builder: (BuildContext context) {
                return UserAccounts();
              },
            );
          },
          icon: Icon(Icons.account_circle),
        ),
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
