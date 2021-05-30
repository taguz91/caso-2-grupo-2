import 'package:flutter/material.dart';
import 'package:flutter_app/src/utils/constantes.dart';

import 'package:flutter_form_builder/flutter_form_builder.dart';

import 'package:flutter_app/routes_generator.dart';
import 'package:flutter_app/src/models/parametros.dart';
import 'package:flutter_app/src/models/ticket.dart';
import 'package:flutter_app/src/providers/parametro_provider.dart';
import 'package:flutter_app/src/providers/ticket_provider.dart';
import 'package:flutter_app/src/widgets/form/form_header.dart';
import 'package:flutter_app/src/widgets/form_error_message.dart';
import 'package:flutter_app/src/widgets/input_container_widget.dart';
import 'package:flutter_app/src/widgets/load_button.dart';
import 'package:flutter_app/src/widgets/personal_app_bar.dart';

class FormCerrarPage extends StatefulWidget {
  final TicketHome ticketHome;

  FormCerrarPage(this.ticketHome);

  @override
  _FormCerrarPageState createState() => _FormCerrarPageState();
}

class _FormCerrarPageState extends State<FormCerrarPage> {
  final _formAsignarKey = GlobalKey<FormBuilderState>();
  final List<Parametro> _usuariosSoporte = [];

  final _ticketProvider = TicketProvider();
  final _parametroProvider = ParametroProvider();

  String? _formError;

  @override
  Widget build(BuildContext context) {
    _loadSoporte();

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
              FormHeader('Cerrar ticket #${widget.ticketHome.ticketId}'),
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
      _parametroProvider.listEstados().then((List<Parametro> value) {
        setState(
          () => {
            _usuariosSoporte.addAll(value.where(
              (element) => [
                TICKET_ESTADO_CERRADO_CON_SOLUCION,
                TICKET_ESTADO_CERRADO_SIN_SOLUCION
              ].contains(element.parametrosId),
            ))
          },
        );
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
          final newTicket = await _ticketProvider.cerrar({
            'ticketId': widget.ticketHome.ticketId,
          }..addAll(_formAsignarKey.currentState!.value));
          if (newTicket != null) {
            Navigator.of(context).pushReplacementNamed(SOPORTE_PAGE);
          } else {
            setState(
              () => _formError =
                  'Error al cerrar el ticket, vuelve a intentarlo en unos minutos.',
            );
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
            label: 'Estado:',
            child: FormBuilderDropdown(
              name: "estado",
              validator: FormBuilderValidators.compose([
                FormBuilderValidators.required(context),
              ]),
              hint: Text(
                _usuariosSoporte.isEmpty
                    ? 'Cargando estados...'
                    : 'Seleciona un estado',
              ),
              items: _usuariosSoporte
                  .map(
                    (e) => DropdownMenuItem(
                      value: e.parametrosId,
                      child: Text(e.nombre),
                    ),
                  )
                  .toList(),
            ),
          ),
          InputContainerWidget(
            label: 'Solución:',
            child: FormBuilderTextField(
              name: "solucion",
              validator: FormBuilderValidators.compose([
                FormBuilderValidators.required(context),
                FormBuilderValidators.minLength(context, 10),
                FormBuilderValidators.maxLength(context, 1000),
              ]),
              maxLines: 5,
            ),
          ),
        ],
      ),
    );
  }
}
