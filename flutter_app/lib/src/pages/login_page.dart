import 'dart:async';
import 'package:flutter/material.dart';

import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';

import 'package:flutter_app/routes_generator.dart';
import 'package:flutter_app/src/data/user_repository.dart';
import 'package:flutter_app/src/widgets/loading_text.dart';
import 'package:flutter_app/src/models/definitios.dart';
import 'package:flutter_app/src/providers/usuario_provider.dart';
import 'package:flutter_app/src/utils/global_settings.dart';
import 'package:flutter_app/src/widgets/form_error_message.dart';
import 'package:flutter_app/src/widgets/input_container_widget.dart';
import 'package:flutter_app/src/widgets/load_button.dart';

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final GlobalKey<FormBuilderState> _formKey = GlobalKey<FormBuilderState>();

  final _usuarioProvider = new UsuarioProvider();
  final _globalSettings = new GlobalSettings();
  final _userRepository = UserRepository();

  late StreamSubscription<ConnectivityResult> _connectivityResult;
  bool _haveConection = true;
  String? _loginError;

  @override
  void initState() {
    super.initState();
    _connectivityResult = Connectivity().onConnectivityChanged.listen(
      (ConnectivityResult result) {
        if (result == ConnectivityResult.none) {
          setState(() => _haveConection = false);
        } else {
          setState(() => _haveConection = true);
        }
      },
    );
  }

  @override
  void dispose() {
    _connectivityResult.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (!_haveConection) {
      Future.delayed(Duration(milliseconds: 500)).then(
        (_) => {Navigator.of(context).pushReplacementNamed(HOME_OFFLINE)},
      );
      return Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.transparent,
          elevation: 0,
        ),
        body: LoadingText(
          text: 'Se perdio la conexión, redireccionando a la versión offline.',
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: Column(
        children: [
          Container(
            alignment: Alignment.topLeft,
            margin: EdgeInsets.only(top: 20, left: 20, right: 15),
            child: Text(
              'Bienvenido \na Tirtec',
              style: TextStyle(
                fontSize: 40,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
          Container(
            margin: EdgeInsets.only(
              top: 12,
              right: 12,
              left: 12,
            ),
            decoration: BoxDecoration(borderRadius: BorderRadius.circular(12)),
            child: Column(
              children: [
                _form(context),
                FormErrorMessage(_loginError),
                _loginButton(context)
              ],
            ),
          )
        ],
      ),
    );
  }

  Widget _loginButton(BuildContext context) {
    return LoadButton(
      label: 'Ingresar',
      onTap: () async {
        FocusScope.of(context).unfocus();
        bool valid = _formKey.currentState!.saveAndValidate();
        await Future.delayed(Duration(seconds: 1));
        if (valid) {
          setState(() => _loginError = null);
          final saveData = _formKey.currentState!.value;
          LoginResponse res = await _usuarioProvider.login(saveData);
          if (res.error != null) {
            setState(() => _loginError = res.error!.message);
          } else {
            UserLogin user = res.user!;

            if (user.haveAccess) {
              await _globalSettings.setUser(user);
              // Guardamos el usuario en la base local
              await _userRepository.saveOrUpdate(user);
              Navigator.of(context).pushReplacementNamed(user.redirectUrl);
            } else {
              setState(
                () => _loginError =
                    'No puedes loguearte en la aplicación, utiliza nuestra plataforma web para acceder.',
              );
            }
          }
        }
      },
    );
  }

  FormBuilder _form(BuildContext context) {
    return FormBuilder(
      key: _formKey,
      child: Column(
        children: [
          InputContainerWidget(
            label: 'Correo:',
            child: FormBuilderTextField(
              name: "correo",
              // initialValue: "johnnygar98@hotmail.com",
              // initialValue: "coordinador@dev.tec",
              // initialValue: "soporten1@dev.tec",
              keyboardType: TextInputType.emailAddress,
              validator: FormBuilderValidators.compose([
                FormBuilderValidators.required(context),
                FormBuilderValidators.email(context)
              ]),
            ),
          ),
          InputContainerWidget(
            label: "Contraseña:",
            child: FormBuilderTextField(
              name: "password",
              // initialValue: "12345678",
              keyboardType: TextInputType.visiblePassword,
              obscureText: true,
              validator: FormBuilderValidators.compose([
                FormBuilderValidators.required(context),
                FormBuilderValidators.minLength(context, 3),
              ]),
            ),
          ),
        ],
      ),
    );
  }
}
