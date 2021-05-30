import 'package:flutter/material.dart';
import 'package:flutter_app/src/widgets/form/form_header_section.dart';

import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:get/get.dart';

import 'package:flutter_app/routes_generator.dart';
import 'package:flutter_app/src/controllers/providers/parametro_provider_controller.dart';
import 'package:flutter_app/src/controllers/user_home_controller.dart';
import 'package:flutter_app/src/models/catalogo.dart';
import 'package:flutter_app/src/providers/ticket_provider.dart';
import 'package:flutter_app/src/widgets/form_error_message.dart';
import 'package:flutter_app/src/widgets/input_container_widget.dart';
import 'package:flutter_app/src/widgets/load_button.dart';

class FormTicketPage extends StatefulWidget {
  final CatalogoServicio _catalogoServicio;
  FormTicketPage(this._catalogoServicio);

  @override
  _FormTicketPageState createState() => _FormTicketPageState();
}

class _FormTicketPageState extends State<FormTicketPage> {
  final _formKey = GlobalKey<FormBuilderState>();

  final _userHomeController = Get.put(UserHomeController());
  final _parametroProviderController = Get.put(ParametroProviderController());

  final _ticketProvider = new TicketProvider();
  String? _formError;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      physics: BouncingScrollPhysics(),
      child: Container(
        margin: EdgeInsets.only(
          top: 12,
          right: 12,
          left: 12,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            FormHeaderSection(
              3,
              marginHorizontal: 8,
            ),
            SizedBox(height: 15),
            _form(context),
            FormErrorMessage(_formError),
            _saveButton(context),
          ],
        ),
      ),
    );
  }

  LoadButton _saveButton(BuildContext context) {
    return LoadButton(
      onTap: () async {
        setState(() => _formError = null);
        FocusScope.of(context).unfocus();
        bool valid = _formKey.currentState!.saveAndValidate();
        await Future.delayed(Duration(seconds: 1));
        if (valid) {
          int ticketId = await _ticketProvider.registerTikcet({
            'catalogoId': widget._catalogoServicio.catalogoId,
            'usuarioId': 0,
          }..addAll(_formKey.currentState!.value));
          if (ticketId != 0) {
            _userHomeController.reset();
            Navigator.of(context).pushReplacementNamed(USER_PAGE);
          } else {
            setState(
              () => _formError =
                  'Error al ingresar el ticket, vuelve a intentarlo en unos minutos.',
            );
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
            child: Obx(() {
              final nivelesImpacto = _parametroProviderController.impactos;

              return FormBuilderDropdown(
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
              );
            }),
          ),
        ],
      ),
    );
  }
}
