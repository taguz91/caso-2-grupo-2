import 'package:flutter/material.dart';
import 'package:flutter_app/routes_generator.dart';
import 'package:flutter_app/src/data/user_repository.dart';

import 'package:flutter_app/src/utils/global_settings.dart';

class LogoutButton extends StatelessWidget {
  final _globalSettings = GlobalSettings();
  final _userRepository = UserRepository();

  @override
  Widget build(BuildContext context) {
    return IconButton(
      onPressed: () async {
        Navigator.of(context).popUntil((route) => route.isFirst);
        if (_globalSettings.isOnline) {
          _userRepository.deleteById(_globalSettings.user.personaId);
          _globalSettings.logout();
          Navigator.of(context).pushReplacementNamed(DEFAULT);
        } else {
          Navigator.of(context).pushReplacementNamed(LOAD);
        }
      },
      icon: Icon(
        Icons.chevron_right,
        color: Colors.red,
      ),
    );
  }
}
