import 'package:flutter/material.dart';

import 'package:flutter_form_builder/flutter_form_builder.dart';

import 'package:flutter_app/src/widgets/form/form_header.dart';
import 'package:flutter_app/src/widgets/input_container_widget.dart';
import 'package:flutter_app/src/widgets/form_error_message.dart';
import 'package:flutter_app/routes_generator.dart';
import 'package:flutter_app/src/providers/ticket_provider.dart';
import 'package:flutter_app/src/widgets/load_button.dart';
import 'package:flutter_app/src/widgets/personal_app_bar.dart';

class FormRechazarPage extends StatefulWidget {
  final int ticketId;

  FormRechazarPage(this.ticketId);

  @override
  _FormRechazarPageState createState() => _FormRechazarPageState();
}

class _FormRechazarPageState extends State<FormRechazarPage> {
  final _formRechazarKey = GlobalKey<FormBuilderState>();
  final _ticketProvider = new TicketProvider();

  String? _formError;

  @override
  Widget build(BuildContext context) {
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
              FormHeader('Rechazar ticket #${widget.ticketId}'),
              _form(context),
              FormErrorMessage(_formError),
              _saveButton(context),
            ],
          ),
        ),
      ),
    );
  }

  LoadButton _saveButton(BuildContext context) {
    return LoadButton(
      onTap: () async {
        setState(() => _formError = null);
        FocusScope.of(context).unfocus();
        bool valid = _formRechazarKey.currentState!.saveAndValidate();
        await Future.delayed(Duration(seconds: 1));
        if (valid) {
          final newTicket = await _ticketProvider.rechazar({
            'ticketId': widget.ticketId,
          }..addAll(_formRechazarKey.currentState!.value));
          if (newTicket != null) {
            Navigator.of(context).pushReplacementNamed(COORDINADOR_PAGE);
          } else {
            setState(() => _formError =
                'Error al rechazar el ticket, vuelve a intentarlo en unos minutos.');
          }
        }
      },
      label: 'Guardar',
    );
  }

  FormBuilder _form(BuildContext context) {
    return FormBuilder(
      key: _formRechazarKey,
      child: Column(
        children: [
          InputContainerWidget(
            label: 'Motivo:',
            child: FormBuilderTextField(
              name: "motivo",
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
