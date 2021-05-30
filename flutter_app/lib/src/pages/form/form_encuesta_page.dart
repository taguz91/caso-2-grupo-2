import 'package:flutter/material.dart';
import 'package:flutter_app/src/widgets/user_app_bar.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';

import 'package:flutter_app/src/custom/starts_option.dart';
import 'package:flutter_app/src/widgets/form/form_header.dart';
import 'package:flutter_app/src/widgets/input_container_widget.dart';
import 'package:flutter_app/src/widgets/form_error_message.dart';
import 'package:flutter_app/routes_generator.dart';
import 'package:flutter_app/src/providers/ticket_provider.dart';
import 'package:flutter_app/src/widgets/load_button.dart';
import 'package:flutter_app/src/widgets/personal_app_bar.dart';

class FormEncuestaPage extends StatefulWidget {
  final TicketHome ticket;

  FormEncuestaPage(this.ticket);

  @override
  _FormEncuestaPageState createState() => _FormEncuestaPageState();
}

class _FormEncuestaPageState extends State<FormEncuestaPage> {
  final _formRechazarKey = GlobalKey<FormBuilderState>();
  final _formStartKey = GlobalKey<StartsOptionState>();
  final _ticketProvider = new TicketProvider();

  String? _formError;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: UserAppBar(),
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
              FormHeader(
                'Encuesta satisfancción ticket #${widget.ticket.ticketId}',
              ),
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
          final selected = _formStartKey.currentState?.selected;
          final newTicket = await _ticketProvider.addEncuesta({
            'ticketid': widget.ticket.ticketId,
            'calificacion': selected,
          }..addAll(_formRechazarKey.currentState!.value));
          if (newTicket) {
            Navigator.of(context).pushReplacementNamed(USER_PAGE);
          } else {
            setState(
              () => _formError =
                  'Error al guardar la encuesta, vuelve a intentarlo en unos minutos.',
            );
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
            label: 'Tu puntuación es importante:',
            child: StartsOption(key: _formStartKey, max: 5),
          ),
          InputContainerWidget(
            label: 'Envianos tus comentarios:',
            child: FormBuilderTextField(
              name: "comentarios",
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
