import 'package:flutter/material.dart';
import 'package:flutter_app/src/providers/usuario_provider.dart';
import 'package:flutter_app/src/utils/constantes.dart';
import 'package:flutter_app/src/utils/global_settings.dart';

import 'package:flutter_form_builder/flutter_form_builder.dart';

import 'package:flutter_app/src/widgets/form/form_header.dart';
import 'package:flutter_app/src/widgets/input_container_widget.dart';
import 'package:flutter_app/src/widgets/form_error_message.dart';
import 'package:flutter_app/routes_generator.dart';
import 'package:flutter_app/src/providers/ticket_provider.dart';
import 'package:flutter_app/src/widgets/load_button.dart';
import 'package:flutter_app/src/widgets/personal_app_bar.dart';

class FormAsignarPage extends StatefulWidget {
  final TicketHome ticketHome;

  FormAsignarPage(this.ticketHome);

  @override
  _FormAsignarPageState createState() => _FormAsignarPageState();
}

class _FormAsignarPageState extends State<FormAsignarPage> {
  final _formAsignarKey = GlobalKey<FormBuilderState>();
  final List<ComboUsuario> _usuariosSoporte = [];
  final _globalSettings = GlobalSettings();

  final _ticketProvider = TicketProvider();
  final _usuarioProvider = UsuarioProvider();

  String? _formError;

  @override
  Widget build(BuildContext context) {
    _loadSoporte();
    final _title = widget.ticketHome.estadoId == TICKET_ESTADO_ABIERTO
        ? 'Asignar Soporte N1'
        : 'Re-asignar Soporte N2';

    return Scaffold(
      appBar: PersonalAppBar(),
      body: SingleChildScrollView(
        physics: BouncingScrollPhysics(),
        child: Container(
          margin: EdgeInsets.only(
            top: 12,
            right: 12,
            left: 12,
          ),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(12),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              FormHeader('$_title #${widget.ticketHome.ticketId}'),
              _form(context),
              FormErrorMessage(_formError),
              _saveButton(context),
            ],
          ),
        ),
      ),
    );
  }

  _loadSoporte() {
    if (_usuariosSoporte.isEmpty) {
      final type = widget.ticketHome.estadoId == TICKET_ESTADO_ABIERTO
          ? ROL_SOPORTE_N1
          : ROL_SOPORTE_N2;
      _usuarioProvider.comboByType(type).then((value) {
        setState(() => _usuariosSoporte.addAll(value));
      });
    }
  }

  LoadButton _saveButton(BuildContext context) {
    return LoadButton(
      onTap: () async {
        setState(() => _formError = null);
        FocusScope.of(context).unfocus();
        bool valid = _formAsignarKey.currentState!.saveAndValidate();
        await Future.delayed(Duration(seconds: 1));
        if (valid) {
          final newTicket = await _ticketProvider.asignar({
            'ticketId': widget.ticketHome.ticketId,
          }..addAll(_formAsignarKey.currentState!.value));
          if (newTicket != null) {
            final type = _globalSettings.user.type;
            if (type == ROL_COORDINADOR) {
              Navigator.of(context).pushReplacementNamed(COORDINADOR_PAGE);
            } else {
              Navigator.of(context).pushReplacementNamed(SOPORTE_PAGE);
            }
          } else {
            setState(() => _formError =
                'Error al asignar el ticket, vuelve a intentarlo en unos minutos.');
          }
        }
      },
      label: 'Guardar',
    );
  }

  FormBuilder _form(BuildContext context) {
    return FormBuilder(
      key: _formAsignarKey,
      child: Column(
        children: [
          InputContainerWidget(
            label: 'Soporte:',
            child: FormBuilderDropdown(
              name: "soporteId",
              validator: FormBuilderValidators.compose([
                FormBuilderValidators.required(context),
              ]),
              hint: Text(
                _usuariosSoporte.isEmpty
                    ? 'Cargando soporte...'
                    : 'Seleciona un soporte',
              ),
              items: _usuariosSoporte
                  .map(
                    (e) => DropdownMenuItem(
                      value: e.usuarioId,
                      child: Text(e.nombreCompleto),
                    ),
                  )
                  .toList(),
            ),
          ),
        ],
      ),
    );
  }
}
