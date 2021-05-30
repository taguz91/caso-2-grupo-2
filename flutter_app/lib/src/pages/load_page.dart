import 'package:connectivity_plus/connectivity_plus.dart';

import 'package:flutter/material.dart';
import 'package:flutter_app/routes_generator.dart';
import 'package:flutter_app/src/models/definitios.dart';
import 'package:flutter_app/src/providers/usuario_provider.dart';
import 'package:flutter_app/src/utils/global_settings.dart';
import 'package:flutter_app/src/widgets/info_text.dart';
import 'package:flutter_app/src/widgets/load_button.dart';
import 'package:flutter_app/src/widgets/loading_text.dart';

class LoadPage extends StatelessWidget {
  final _usuarioProvider = UsuarioProvider();
  final _globalSettings = new GlobalSettings();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: FutureBuilder(
        future: Connectivity().checkConnectivity().timeout(
          Duration(seconds: 5),
          onTimeout: () {
            return ConnectivityResult.none;
          },
        ),
        builder: (
          BuildContext context,
          AsyncSnapshot<ConnectivityResult> snapshot,
        ) {
          if (snapshot.hasData) {
            final ConnectivityResult conection = snapshot.data!;
            if (conection == ConnectivityResult.none) {
              return Column(
                children: [
                  InfoText(
                    'No tenemos conexión...\nPuedes usar la versión offline.',
                  ),
                  Icon(
                    Icons.cloud_off,
                    size: 80,
                    color: Theme.of(context).primaryColor.withOpacity(0.75),
                  ),
                  Container(child: _loginButton(context), width: 300),
                ],
              );
            }
            return _initUser(context);
          } else if (snapshot.hasError) {
            return LoadingText(text: 'Error en la conexón: ${snapshot.error}');
          }

          return LoadingText(text: 'Comprobando conexión...');
        },
      ),
    );
  }

  Widget _initUser(BuildContext context) {
    return FutureBuilder(
      future: _usuarioProvider.getUserData(),
      builder: (
        BuildContext context,
        AsyncSnapshot<LoginResponse> snapshot,
      ) {
        if (snapshot.hasData) {
          LoginResponse res = snapshot.data!;
          if (res.error != null) {
            return Column(
              children: [
                InfoText(res.error!.message),
                Container(child: _offlineButton(context), width: 300),
              ],
            );
          } else {
            UserLogin user = res.user!;
            _globalSettings.user = user;

            if (user.haveAccess) {
              Future.delayed(Duration(milliseconds: 500)).then(
                (_) => {
                  Navigator.of(context).pushReplacementNamed(user.redirectUrl)
                },
              );
              return InfoText('Vamos...');
            } else {
              return InfoText(
                'No puedes loguearte en la aplicación, utiliza nuestra plataforma web para acceder.',
              );
            }
          }
        }

        return LoadingText(text: 'Iniciando sesión...');
      },
    );
  }

  Widget _offlineButton(BuildContext context) {
    return LoadButton(
      label: 'Vamos',
      onTap: () {
        Navigator.of(context).pushReplacementNamed(DEFAULT);
      },
    );
  }

  Widget _loginButton(BuildContext context) {
    return LoadButton(
      label: 'Vamos',
      onTap: () async {
        await Future.delayed(Duration(seconds: 2));
      },
    );
  }
}
