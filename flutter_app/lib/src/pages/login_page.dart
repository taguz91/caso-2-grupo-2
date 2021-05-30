import 'package:flutter/material.dart';
import 'package:flutter_app/routes_generator.dart';
import 'package:flutter_app/src/controllers/widgets/load_button_controller.dart';
import 'package:flutter_app/src/models/definitios.dart';
import 'package:flutter_app/src/providers/usuario_provider.dart';
import 'package:flutter_app/src/utils/constantes.dart';
import 'package:flutter_app/src/utils/global_settings.dart';
import 'package:flutter_app/src/widgets/form_error_message.dart';
import 'package:flutter_app/src/widgets/input_container_widget.dart';
import 'package:flutter_app/src/widgets/load_button.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final GlobalKey<FormBuilderState> _formKey = GlobalKey<FormBuilderState>();
  final UsuarioProvider _usuarioProvider = new UsuarioProvider();
  final GlobalSettings _globalSettings = new GlobalSettings();

  String? _loginError;

  @override
  Widget build(BuildContext context) {
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
            _globalSettings.user = res.user!;
            final int userType = res.user!.type;

            if (userType == ROL_COORDINADOR) {
              Navigator.of(context).pushReplacementNamed(COORDINADOR_PAGE);
            } else if (userType == ROL_SOPORTE_N1 ||
                userType == ROL_SOPORTE_N2) {
              Navigator.of(context).pushReplacementNamed(SOPORTE_PAGE);
            } else if (userType == ROL_USUARIO) {
              Navigator.of(context).pushReplacementNamed(USER_PAGE);
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
              initialValue: "soporten1@dev.tec",
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
              initialValue: "12345678",
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
