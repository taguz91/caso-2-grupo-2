import 'package:flutter/material.dart';
import 'package:flutter_app/routes_generator.dart';
import 'package:flutter_app/src/models/catalogo.dart';
import 'package:flutter_app/src/models/parametros.dart';
import 'package:flutter_app/src/providers/parametro_provider.dart';
import 'package:flutter_app/src/providers/ticket_provider.dart';
import 'package:flutter_app/src/widgets/form_error_message.dart';
import 'package:flutter_app/src/widgets/input_container_widget.dart';
import 'package:flutter_app/src/widgets/load_button.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';

class FormTicketPage extends StatefulWidget {
  final CatalogoServicio _catalogoServicio;
  FormTicketPage(this._catalogoServicio);

  @override
  _FormTicketPageState createState() => _FormTicketPageState();
}

class _FormTicketPageState extends State<FormTicketPage> {
  final _formKey = GlobalKey<FormBuilderState>();
  final List<Parametro> nivelesImpacto = [];
  final _parametroProvider = new ParametroProvider();
  final _ticketProvider = new TicketProvider();

  String? _formError;

  @override
  Widget build(BuildContext context) {
    _loadImpactos();
    return SingleChildScrollView(
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
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            _form(context),
            FormErrorMessage(_formError),
            _saveButton(context),
          ],
        ),
      ),
    );
  }

  _loadImpactos() {
    if (nivelesImpacto.isEmpty) {
      _parametroProvider.listImpactos().then((value) {
        setState(() => nivelesImpacto.addAll(value));
      });
    }
  }

  LoadButton _saveButton(BuildContext context) {
    return LoadButton(
      onTap: () async {
        await Future.delayed(Duration(seconds: 1));
        setState(() => _formError = null);
        FocusScope.of(context).unfocus();
        bool valid = _formKey.currentState!.saveAndValidate();
        if (valid) {
          int ticketId = await _ticketProvider.registerTikcet({
            'catalogoId': widget._catalogoServicio.catalogoId,
            'usuarioId': 0,
          }..addAll(_formKey.currentState!.value));
          if (ticketId != 0) {
            Navigator.of(context).pushReplacementNamed(USER_PAGE);
          } else {
            setState(() => _formError =
                'Error al ingresar el ticket, vuelve a intentarlo en unos minutos.');
          }
        }
      },
      label: 'Guardar',
    );
  }

  FormBuilder _form(BuildContext context) {
    return FormBuilder(
      key: _formKey,
      child: Column(
        children: [
          InputContainerWidget(
            label: 'Titulo:',
            child: FormBuilderTextField(
              name: "titulo",
              keyboardType: TextInputType.emailAddress,
              validator: FormBuilderValidators.compose([
                FormBuilderValidators.required(context),
                FormBuilderValidators.minLength(context, 3),
                FormBuilderValidators.maxLength(context, 100),
              ]),
            ),
          ),
          InputContainerWidget(
            label: 'Descripción:',
            child: FormBuilderTextField(
              name: "descripcion",
              validator: FormBuilderValidators.compose([
                FormBuilderValidators.required(context),
                FormBuilderValidators.minLength(context, 10),
                FormBuilderValidators.maxLength(context, 1000),
              ]),
              maxLines: 5,
            ),
          ),
          InputContainerWidget(
            label: 'Impacto:',
            child: FormBuilderDropdown(
              name: "impactoId",
              validator: FormBuilderValidators.compose([
                FormBuilderValidators.required(context),
              ]),
              hint: Text(
                nivelesImpacto.isEmpty
                    ? 'Cargando impactos...'
                    : 'Selecionar impacto',
              ),
              items: nivelesImpacto
                  .map(
                    (e) => DropdownMenuItem(
                      value: e.parametrosId,
                      child: Text(e.nombre),
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
